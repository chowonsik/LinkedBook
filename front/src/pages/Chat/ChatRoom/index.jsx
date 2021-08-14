import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import Header from "../../../components/Layout/Header";
import { Wrapper, Container } from "./styles";
import ChatLogBox from "../../../components/Chat/ChatLogBox";
import InputMessage from "../../../components/Chat/InputMessage";

let msg_check;
function ChatRoom() {
  const sock = new SockJS("http://localhost:8080/api/ws-stomp");
  const ws = Stomp.over(sock);
  const [content, setContent] = useState("");
  const [value, setValue] = useState("");
  const [chatLogs, setChatLogs] = useState([]);
  const history = useHistory();
  /*const loginUser = {
    userName: "kim",
  };*/
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  let roomId = history.location.pathname.split("/");
  console.log(roomId);
  roomId = roomId[roomId.length - 1];

  function handleChange(e) {
    setValue(e.target.value);
  }
  const sendMsg = () => {
    ws.send(
      `/pub/chat/message`,
      { token: loginUser.accessToken },
      JSON.stringify({
        type: "TALK",
        roomId,
        message: value,
        userName: loginUser.email,
        toUserId: 3,
        fromUserId: 2,
      })
    );
    setValue("");
  };

  useEffect(() => {
    const token = loginUser.accessToken;
    const chat_logs = chatLogs;
    console.log(roomId);
    const params = {
      url: `/api/chat-messages?roomId=${roomId}`,
      method: "GET",
    };
    axios(params)
      .then((response) => {
        console.log(response.data);
        response.data.result.forEach((v) => {
          if (v.type === "TALK") {
            chat_logs.push(v);
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
            toUserId: 3,
            fromUserId: 2,
            //userProfile: user_profile,
          })
        );
        ws.subscribe(`/sub/chat/room/${roomId}`, (data) => {
          const newMsg = JSON.parse(data.body);
          if (msg_check !== newMsg) {
            chat_logs.unshift(newMsg);
            setChatLogs([...chat_logs]);
            console.log(chatLogs);
          }
        });
      }
    );

    return () => {
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
      <Header isBack={true} title={"lee"} />
      <Container>
        {chatLogs &&
          chatLogs.map((chat) => {
            console.log(chat);
            if (chat.type === "TALK") {
              return (
                <ChatLogBox
                  userType={chat.userName === loginUser.userName ? true : false}
                  userName={chat.userName}
                  profileImage={chat.profileImage}
                  message={chat.message}
                  createdAt={chat.createdAt}
                />
              );
            }
          })}
      </Container>
      <InputMessage onChange={handleChange} value={value} onClick={sendMsg} />
    </Wrapper>
  );
}

export default ChatRoom;
