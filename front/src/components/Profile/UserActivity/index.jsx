import React from "react";
import { Wrapper } from "./styles";

function UserActivity({ dealCnt, followerCnt, followingCnt }) {
  return (
    <Wrapper>
      <dl className="user-activity">
        <div>
          <dt>게시글</dt>
          <dd>{dealCnt}</dd>
        </div>
        <div>
          <dt>팔로워</dt>
          <dd>{followerCnt}</dd>
        </div>
        <div>
          <dt>팔로잉</dt>
          <dd>{followingCnt}</dd>
        </div>
      </dl>
    </Wrapper>
  );
}

export default UserActivity;
