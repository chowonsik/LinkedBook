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
  const sock = new SockJS("/ws-stomp");
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
  roomId = roomId[roomId.length - 1];

  function handleChange(e) {
    setValue(e.target.value);
  }
  const sendMsg = () => {
    ws.send(
      `/pub/api/chat/message`,
      { token: loginUser.accessToken },
      JSON.stringify({
        type: "TALK",
        roomId,
        message: value,
        userName: loginUser.email,
        //userProfile: user_profile,
      })
    );
    setValue("");
  };

  useEffect(() => {
    const token = loginUser.accessToken;
    const chat_logs = chatLogs;
    const params = {
      url: `/api/chat/message/${roomId}`,
      method: "GET",
    };
    axios(params)
      .then((response) => {
        console.log(response.data);
        response.data.forEach((v) => {
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
          `/pub/api/chat/message`,
          { token: token },
          JSON.stringify({
            type: "ENTER",
            roomId,
            message: content,
            userName: loginUser.email,
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
