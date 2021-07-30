import React from "react";
import "./style.scss";

function UserActivity({ articles, following, follower }) {
  return (
    <div>
      <dl className="user-activity">
        <div>
          <dd>게시물</dd>
          <dt>{articles}</dt>
        </div>
        <div>
          <dd>팔로워</dd>
          <dt>{following}</dt>
        </div>
        <div>
          <dd>팔로잉</dd>
          <dt>{follower}</dt>
        </div>
      </dl>
    </div>
  );
}

export default UserActivity;
