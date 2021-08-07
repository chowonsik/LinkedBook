import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BookmarkCheckFill, GearFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";
import MannerScore from "../../common/MannerScore";

const UserInfo = ({ userObj }) => {
  let history = useHistory();
  const [isFollow, setIsFollow] = useState(userObj.isFollow);
  function toggleFollowBtn() {
    setIsFollow(!isFollow);
    // API 요청
  }
  function handleUserSetting() {
    history.push("/profile/update");
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
              <GearFill onClick={handleUserSetting} className="user-setting" />
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
