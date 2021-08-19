import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Header from "../../../components/Layout/Header";
import { Wrapper, Container } from "./styles";
import InputMessage from "../../../components/Chat/InputMessage";
import MyChat from "../../../components/Chat/MyChat";
import OtherChat from "../../../components/Chat/OtherChat";
import DateLine from "../../../components/Chat/DateLine";
import { useDispatch } from "react-redux";

function ChatRoom() {
  const sock = new SockJS(`${process.env.REACT_APP_API_URL}/api/ws-stomp`);
  const ws = Stomp.over(sock);
  const [value, setValue] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const [reversedChatLogs, setReversedChatLogs] = useState([]);
  const [chatListHeight, setChatListHeight] = useState(
    window.innerHeight - 110
  );
  const inputRef = useRef(null);
  const history = useHistory();
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const fromUser = history.location.state.fromUser;
  const toUser = history.location.state.toUser;
  let roomId = history.location.pathname.split("/");
  roomId = roomId[roomId.length - 1];

  useEffect(() => {
    setReversedChatLogs(chatLogs.slice().reverse());
  }, [chatLogs]);

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
      toUserId: history.location.state.toUser.toUserId,
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

    const chat_logs = chatLogs;
    const params = {
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
                chat.userId === toUser.toUserId
                  ? fromUser.fromUserId
                  : toUser.toUserId,
              image:
                chat.image === toUser.toUserId
                  ? fromUser.fromUserImage
                  : toUser.toUserImage,
              nickname:
                chat.nickname === toUser.toUserNickname
                  ? fromUser.fromUserNickname
                  : toUser.toUserNickname,
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
        if (history.location.state.create) {
          ws.send(
            `/pub/chat/message`,
            { token: token },
            JSON.stringify({
              type: "ENTER",
              roomId,
              message: `${fromUser.fromUserNickname}님이 입장했습니다.`,
              userName: loginUser.email,
              toUserId: history.location.state.toUser.toUserId,
              fromUserId: loginUser.id,
              //userProfile: user_profile,
            })
          );
        }
        ws.subscribe(`/sub/chat/room/${roomId}`, (data) => {
          const newMsg = JSON.parse(data.body);
          if (newMsg.type === "TALK") {
            // 내가보낸 메세지
            if (newMsg.fromUserId === loginUser.id) {
              const newChat = {
                type: "TALK",
                createdAt: new Date(),
                userId: loginUser.id,
                image: fromUser.fromUserImage,
                message: newMsg.message,
                nickname: fromUser.fromUserNickname,
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
                image: toUser.toUserImage,
                message: newMsg.message,
                nickname: toUser.toUserNickname,
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
      <Header isBack={true} title={toUser.toUserNickname} />
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
                        userId={chat.userId}
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
                      userId={chat.userId}
                    />
                  );
                }
              }
            }
          })}
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
