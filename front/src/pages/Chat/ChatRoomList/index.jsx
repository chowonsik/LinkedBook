import React, { useEffect, useState } from "react";
import Footer from "../../../components/Layout/Footer";
import Header from "../../../components/Layout/Header";
import { Wrapper, ChatRoom } from "./style";
import { request, requestGet } from "../../../api.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ChatRoomList() {
  const [chatList, setChatList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    getChatList();
  }, []);
  async function getChatList() {
    const loginUserId = JSON.parse(localStorage.getItem("loginUser")).id;
    const response = await requestGet("/chat/rooms", { userId: loginUserId });
    console.log(response);
    if (response.isSuccess) {
      const list = response.result.map((chat) => {
        const data = {
          bookImage: chat.bookImage,
          deal_id: chat.deal_id,
          room_id: chat.room_id,
          message: chat.message,
          messageCreatedAt: chat.messageCreatedAt,
        };
        if (loginUserId === chat.toUserId) {
          data.userId = chat.fromUserId;
          data.userImage = chat.fromUserImage;
          data.userNickname = chat.fromUserNickname;
        } else {
          data.userId = chat.toUserId;
          data.userImage = chat.toUserImage;
          data.userNickname = chat.toUserNickname;
        }
        console.log(data);
        return data;
      });
      setChatList(list);
    } else {
    }
  }
  function dateToString(dateString) {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    let md = "";
    let time = "";
    if (hour >= 12) {
      time = `오후 ${hour === 12 ? hour : hour - 12}:${
        minute < 10 ? "0" + minute : minute
      }`;
    } else {
      time = `오전 ${hour}:${minute < 10 ? "0" + minute : minute}`;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const today = new Date();
    if (
      year === today.getFullYear() &&
      month === today.getMonth() + 1 &&
      day === today.getDate()
    ) {
      return time;
    } else {
      md = `${year}/${month}/${day}`;
      return md;
    }
  }
  return (
    <>
      <Header isLogo isSearch isAlarm />
      <Wrapper>
        {chatList.map((chatRoom, i) => (
          <ChatRoom
            key={i}
            onClick={() => {
              history.push(`/chat/room/${chatRoom.room_id}`);
            }}
          >
            <div className="user-img-container">
              <img
                src={chatRoom.userImage}
                alt="유저"
                onError={(e) => {
                  e.target.src =
                    "https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image.png";
                }}
              />
            </div>
            <div className="chat-info-container">
              <span className="nickname">{chatRoom.userNickname}</span>
              <span className="message">{chatRoom.message}</span>
              <span className="time">
                {dateToString(chatRoom.messageCreatedAt)}
              </span>
            </div>
            <div className="book-img-container">
              <img src={chatRoom.bookImage} alt="책" />
            </div>
          </ChatRoom>
        ))}
      </Wrapper>
      <Footer />
    </>
  );
}
