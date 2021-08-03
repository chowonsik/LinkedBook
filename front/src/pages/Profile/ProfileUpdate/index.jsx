import React from "react";
import "./style.scss";
import useInput from "../../../hooks/useInput";
import { Link } from "react-router-dom";
import Button from "../../../components/Common/Button";

const ProfileUpdate = ({}) => {
  // props 전달하는지 새로운 정보 요청하는지?
  const userObj = {
    nickname: "나무늘보",
    email: "deraholt@naver.com",
    info: "나무늘보 서점에 오신걸 환영",
    location: "덕명동",
  };

  const nickname = useInput(userObj.nickname, nicknameValidator);
  const email = useInput(userObj.email, emailValidator);
  const info = useInput(userObj.info, infoValidator);

  function nicknameValidator(value) {
    if (value.length < 2 || value.length > 10) {
      return {
        isValid: false,
        errorMessage: "2글자 이상 10글자 이하로 입력해주세요",
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  function emailValidator(value) {
    const reg = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const result = reg.test(value);
    if (result) {
      return { isValid: true, errorMessage: "" };
    } else {
      return { isValid: false, errorMessage: "이메일 형식으로 입력하세요" };
    }
  }

  function infoValidator(value) {
    if (value.length > 80) {
      return {
        isValid: false,
        errorMessage: "80자 이내로 입력해주세요",
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  return (
    <>
      <img src={userObj.image} alt="profile" />

      <div className="label-with-input">
        <label htmlFor="email">아이디(이메일)</label>
        <input
          type="text"
          id="nickname"
          onChange={email.onChange}
          value={email.value}
        ></input>
        <div className="error-message">
          {email.isValid ? "" : email.errorMessage}
        </div>
      </div>

      <div className="label-with-input">
        <label htmlFor="nickname">닉네임(서점명)</label>
        <input
          type="text"
          id="email"
          onChange={nickname.onChange}
          value={nickname.value}
        ></input>
        <div className="error-message">
          {nickname.isValid ? "" : nickname.errorMessage}
        </div>
      </div>

      <div className="label-with-input">
        <label htmlFor="info">프로필 설명</label>
        <textarea
          id="info"
          onChange={info.onChange}
          value={info.value}
          rows="3"
          cols="30"
        ></textarea>
        <div className="error-message">
          {info.isValid ? "" : info.errorMessage}
        </div>
      </div>

      <div className="label-with-input">
        <Link to="/profile/update/location">
          <label>내 지역</label>
          <input value={userObj.location}></input>
        </Link>
      </div>
      <Link to="/profile/update/password">
        <button>비밀번호 변경</button>
      </Link>
      <button>회원 탈퇴</button>
      <Button color="white" background="var(--color-main)"></Button>
    </>
  );
};

export default ProfileUpdate;
