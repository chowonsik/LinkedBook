import React from "react";
import "./style.scss";
function UserInfo({ userObj }) {
  return (
    <section className="profile">
      <div className="profile-content">
        <img className="profile-img" src={userObj.image} alt="profile image" />
        <div className="profile-info">
          <div className="profile-title">
            <h1 className="username">{userObj.nickname}</h1>
            <i className="fas fa-bookmark bookmark"></i>
            <i className="fas fa-cog" aria-label="update profile"></i>
          </div>
          <div className="profile-detail">
            <strong className="location">{userObj.dongmyeonri}</strong>
            <i className="fas fa-smile-wink manner" alt="매너온도">
              <span>{userObj.manner}</span>
            </i>
          </div>
        </div>
      </div>
      <p className="profile-description">{userObj.info}</p>
    </section>
  );
}

export default UserInfo;
