import React from "react";
import { useHistory } from "react-router-dom";
import { Wrapper } from "./styles";

function UserActivity({ userId, dealCnt, followerCnt, followingCnt }) {
  const history = useHistory();
  return (
    <Wrapper>
      <dl className="user-activity">
        <div>
          <dt>게시글</dt>
          <dd>{dealCnt}</dd>
        </div>
        <div onClick={() => history.push(`/follower/${userId}`)}>
          <dt>팔로워</dt>
          <dd>{followerCnt}</dd>
        </div>
        <div onClick={() => history.push(`/following/${userId}`)}>
          <dt>팔로잉</dt>
          <dd>{followingCnt}</dd>
        </div>
      </dl>
    </Wrapper>
  );
}

export default UserActivity;
