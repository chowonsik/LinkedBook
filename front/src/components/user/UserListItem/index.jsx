import "./style.scss";
import React from "react";
const UserListItem = ({ nickname, count }) => {
  return (
    <div className="user-list-item">
      <div className="icon-container">
        <div className="icon"></div>
      </div>
      <div className="right-container">
        <div className="text-container">
          <div className="nickname">{nickname}</div>
          <div className="book-count">등록한 책: {count}</div>
        </div>
        <div className="button-container">
          <button className="button">팔로우</button>
        </div>
      </div>
    </div>
  );
};

export default UserListItem;
