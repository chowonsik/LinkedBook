import React from "react";
import { Link } from "react-router-dom";
import { BookmarkCheckFill, GearFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";
import MannerScore from "../../common/MannerScore";

const UserInfo = ({ userObj, isFollow, toggleFollowBtn }) => {
  const LOGIN_USER_ID = JSON.parse(
    window.localStorage.getItem("loginUser")
  )?.id;
  return (
    <Wrapper>
      <div className="profile-content">
        <img
          className="profile-img"
          src={userObj.image}
          onError={(e) => {
            e.target.src =
              "https://www.voakorea.com/themes/custom/voa/images/Author__Placeholder.png";
          }}
          alt="profile"
        />
        <div className="profile-info">
          <div className="user-info">
            <div className="user-title">
              <h1 className="username">{userObj.nickname}</h1>
              {LOGIN_USER_ID === userObj.userId ? (
                <Link to="/profile/update">
                  <GearFill className="user-setting" />
                </Link>
              ) : (
                ""
              )}
            </div>
            <div className="user-detail">
              <strong className="location">{userObj.dong}</strong>
              <MannerScore score={userObj.mannerScore} />
            </div>
            {LOGIN_USER_ID !== userObj.userId ? (
              <div onClick={toggleFollowBtn} isFollow className="follow-btn">
                {isFollow ? (
                  <button className="following"> 팔로잉</button>
                ) : (
                  <button className="follower">팔로우</button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>

          <Link
            to={{
              pathname: `/profile/${userObj.userId}/history`,
              state: { userId: userObj.userId },
            }}
          >
            <BookmarkCheckFill className="user-history" />
          </Link>
        </div>
      </div>
      <p className="profile-description">{userObj.info}</p>
    </Wrapper>
  );
};

export default UserInfo;
