import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "./style";

export default function OtherChat({
  profileImage,
  message,
  createdAt,
  userId,
}) {
  const history = useHistory();
  function dateToString(date) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour >= 12) {
      return `오후 ${hour === 12 ? hour : hour - 12}:${
        minute < 10 ? "0" + minute : minute
      }`;
    } else {
      return `오전 ${hour}:${minute < 10 ? "0" + minute : minute}`;
    }
  }
  return (
    <Container>
      <div
        className="img-container"
        onClick={() => {
          history.push(`/profile/${userId}`);
        }}
      >
        <img
          src={profileImage}
          alt=""
          onError={(e) => {
            e.target.src =
              "https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image.png";
          }}
        />
      </div>
      <div className="message">{message}</div>
      <div className="createdAt">{dateToString(createdAt)}</div>
    </Container>
  );
}
