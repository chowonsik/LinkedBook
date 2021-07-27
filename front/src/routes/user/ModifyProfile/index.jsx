import "./style.scss";
import useInput from "../../../hooks/useInput";

const ModifyProfile = () => {
  const nickname = useInput("", nicknameValidator);
  function nicknameValidator(value) {
    return { isValid: true, errorMessage: "" };
  }
  return (
    <div className="modify-profile">
      <div className="wrap">
        <h1>프로필 수정(헤더)</h1>
        <div className="out">
          <u>계정탈퇴</u>
        </div>
        <div className="profile-img">
          <div className="img"></div>
          <div className="text">이미지 변경</div>
        </div>
        <div className="label-with-input">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            value={nickname.value}
            onChange={nickname.onChange}
          />
          <div className="error-message">
            중복된 닉네임 입니다.
            {/* {nickname.isValid ? "" : nickname.errorMessage} */}
          </div>
        </div>
        <div className="label-with-input">
          <label htmlFor="email">이메일</label>
          <input type="text" id="email" value="dwbyun16@gmail.com" readOnly />
        </div>
        <button className="button button-sm">비밀번호 변경</button>
        <button className="button">수정 완료</button>
      </div>
    </div>
  );
};

export default ModifyProfile;
