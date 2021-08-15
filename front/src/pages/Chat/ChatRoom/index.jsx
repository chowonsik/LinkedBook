import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Header from "../../../components/Layout/Header";
import { Wrapper, Container } from "./styles";
import ChatLogBox from "../../../components/Chat/ChatLogBox";
import InputMessage from "../../../components/Chat/InputMessage";
import MyChat from "../../../components/Chat/MyChat";
import OtherChat from "../../../components/Chat/OtherChat";
import DateLine from "../../../components/Chat/DateLine";
import { request, requestGet } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../../actions/Notification";

function ChatRoom() {
  const sock = new SockJS(`${process.env.REACT_APP_API_URL}/api/ws-stomp`);
  const ws = Stomp.over(sock);
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const [reversedChatLogs, setReversedChatLogs] = useState([]);
  const [chatListHeight, setChatListHeight] = useState(
    window.innerHeight - 110
  );
  const [stateToUser, setStateToUser] = useState({});
  const inputRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const toUserId = parseInt(history.location?.toUserId);
  let roomId = history.location.pathname.split("/");
  roomId = roomId[roomId.length - 1];

  useEffect(() => {
    setReversedChatLogs(chatLogs.slice().reverse());
  }, [chatLogs]);

  function isDayChanged(date1, date2) {
    if (
      date1.getDate() !== date2.getDate() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getYear() !== date2.getYear()
    )
      return true;
    return false;
  }

  function getListHeight() {
    setChatListHeight(window.innerHeight - 110);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") {
      sendMsg();
    }
  }
  function sendMsg() {
    inputRef.current.focus();
    if (value.split(" ").join("").length === 0) return;
    const message = {
      type: "TALK",
      roomId,
      message: value,
      userName: loginUser.email,
      toUserId: stateToUser.id,
      fromUserId: loginUser.id,
    };
    ws.send(
      `/pub/chat/message`,
      { token: loginUser.accessToken },
      JSON.stringify(message)
    );
    setValue("");
  }

  function isMe(id) {
    return id === loginUser.id ? true : false;
  }

  useEffect(() => {
    window.addEventListener("resize", getListHeight);
    const token = loginUser.accessToken;
    let fromUser = {};
    let toUser = {};
    // fromuser touser 가져오기
    let params = {
      url: `/api/chat/rooms?userId=${loginUser.id}`,
      method: "GET",
      headers: {
        "X-ACCESS-TOKEN": loginUser.accessToken,
      },
    };
    axios(params)
      .then((response) => {
        const thisRoom = response.data.result.find(
          (room) => room.room_id === roomId
        );
        if (thisRoom.fromUserId === loginUser.id) {
          fromUser = {
            id: thisRoom.fromUserId,
            nickname: thisRoom.fromUserNickname,
            image: thisRoom.fromUserImage,
          };
          toUser = {
            id: thisRoom.toUserId,
            nickname: thisRoom.toUserNickname,
            image: thisRoom.toUserImage,
          };
        } else {
          fromUser = {
            id: thisRoom.toUserId,
            nickname: thisRoom.toUserNickname,
            image: thisRoom.toUserImage,
          };
          toUser = {
            id: thisRoom.fromUserId,
            nickname: thisRoom.fromUserNickname,
            image: thisRoom.fromUserImage,
          };
        }
        setStateToUser(toUser);
      })
      .catch((err) => console.log(err));

    const chat_logs = chatLogs;
    params = {
      url: `/api/chat-messages?roomId=${roomId}`,
      method: "GET",
    };
    axios(params)
      .then((response) => {
        response.data.result.forEach((chat) => {
          if (chat.type === "TALK") {
            chat_logs.push({
              ...chat,
              createdAt: new Date(chat.created_at),
              userId:
                chat.userId === loginUser.id ? stateToUser.id : loginUser.id,
            });
          }
        });
        setChatLogs([...chat_logs]);
      })
      .catch((err) => console.log(err));

    ws.connect(
      {
        token: token,
      },
      () => {
        ws.send(
          `/pub/chat/message`,
          { token: token },
          JSON.stringify({
            type: "ENTER",
            roomId,
            message: content,
            userName: loginUser.email,
            toUserId: toUserId,
            fromUserId: loginUser.id,
            //userProfile: user_profile,
          })
        );
        ws.subscribe(`/sub/chat/room/${roomId}`, (data) => {
          const newMsg = JSON.parse(data.body);
          if (newMsg.type === "TALK") {
            // 내가보낸 메세지
            if (newMsg.fromUserId === loginUser.id) {
              const newChat = {
                type: "TALK",
                createdAt: new Date(),
                userId: loginUser.id,
                image: fromUser.image,
                message: newMsg.message,
                nickname: fromUser.nickname,
              };
              chat_logs.push(newChat);
              setChatLogs([...chat_logs]);
            }
            //남이 보낸 메세지
            else {
              const newChat = {
                type: "TALK",
                createdAt: new Date(),
                userId: toUser.id,
                image: toUser.image,
                message: newMsg.message,
                nickname: toUser.nickname,
              };
              chat_logs.push(newChat);
              setChatLogs([...chat_logs]);
            }
          }
        });
      }
    );

    return () => {
      window.removeEventListener("resize", getListHeight);
      ws.send(
        `/pub/api/chat/message`,
        { token: token },
        JSON.stringify({
          type: "QUIT",
          roomId,
          message: content,
          userName: loginUser.email,
          //userProfile: user_profile,
        })
      );
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0");
        },
        { token: token }
      );
    };
  }, []);

  return (
    <Wrapper>
      <Header isBack={true} title={stateToUser.nickname} />
      <Container height={chatListHeight}>
        {reversedChatLogs &&
          reversedChatLogs.map((chat, i) => {
            if (chat.type === "TALK") {
              if (isMe(chat.userId)) {
                if (
                  i === reversedChatLogs.length - 1 ||
                  chat.createdAt.getDate() !==
                    reversedChatLogs[i + 1].createdAt.getDate()
                ) {
                  return (
                    <>
                      <MyChat
                        message={chat.message}
                        createdAt={chat.createdAt}
                        key={i}
                      />
                      <DateLine date={chat.createdAt} />
                    </>
                  );
                } else {
                  return (
                    <MyChat
                      message={chat.message}
                      createdAt={chat.createdAt}
                      key={i}
                    />
                  );
                }
              } else {
                if (
                  i === reversedChatLogs.length - 1 ||
                  chat.createdAt.getDate() !==
                    reversedChatLogs[i + 1].createdAt.getDate()
                ) {
                  return (
                    <>
                      <OtherChat
                        key={i}
                        userName={chat.nickname}
                        profileImage={chat.image}
                        message={chat.message}
                        createdAt={chat.createdAt}
                      />
                      <DateLine date={chat.createdAt} />
                    </>
                  );
                } else {
                  return (
                    <OtherChat
                      key={i}
                      userName={chat.nickname}
                      profileImage={chat.image}
                      message={chat.message}
                      createdAt={chat.createdAt}
                    />
                  );
                }
              }
            }
          })}
        {/* {chatLogs &&
          chatLogs.map((chat) => {
            // console.log(chat);
            if (chat.type === "TALK") {
              return (
                <ChatLogBox
                  userType={isMe(chat.userId)}
                  userName={chat.userName}
                  profileImage={chat.profileImage}
                  message={chat.message}
                  createdAt={chat.createdAt}
                />
              );
            }
          })} */}
      </Container>
      <InputMessage
        onChange={handleChange}
        value={value}
        onClick={sendMsg}
        onKeyUp={handleKeyUp}
        inputRef={inputRef}
      />
    </Wrapper>
  );
}

export default ChatRoom;
