import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkCheckFill, GearFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";
import MannerScore from "../../common/MannerScore";

const UserInfo = ({ userObj }) => {
  const [isFollow, setIsFollow] = useState(userObj.isFollow);
  function toggleFollowBtn() {
    setIsFollow(!isFollow);
    // API 요청
  }

  return (
    <Wrapper>
      <div className="profile-content">
        <img className="profile-img" src={userObj.image} alt="profile" />
        <div className="profile-info">
          <div className="user-info">
            <div className="user-title">
              <h1 className="username">{userObj.nickname}</h1>
              {/* 자기 프로필인 경우 안보이도록 하는 기능 추가 필요 */}
              <Link to="/profile/update">
                <GearFill className="user-setting" />
              </Link>
            </div>
            <div className="user-detail">
              <strong className="location">{userObj.dong}</strong>
              <MannerScore score={userObj.mannerScore} />
            </div>
            {/* 자기 프로필인 경우 안보이도록 하는 기능 추가 필요 */}
            <button onClick={toggleFollowBtn} className="follow-btn">
              {isFollow ? "팔로잉" : "팔로우"}
            </button>
          </div>
          <Link to="/profile/history">
            <BookmarkCheckFill className="user-history" />
          </Link>
        </div>
      </div>
      <p className="profile-description">{userObj.info}</p>
    </Wrapper>
  );
};

export default UserInfo;
