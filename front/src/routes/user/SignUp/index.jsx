import useInput from "../../../hooks/useInput";
import "./style.scss";

const SignUp = () => {
  const nickname = useInput("", nicknameValidator);
  const email = useInput("", emailValidator);
  const password = useInput("", passwordValidator);
  const passwordConfirm = useInput("", passwordConfirmValidator);

  function nicknameValidator(value) {
    if (value.length < 2 || value.length > 10) {
      return { isValid: false, errorMessage: "2글자 이상 10글자 이하" };
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

  function passwordValidator(value) {
    return { isValid: true, errorMessage: "" };
  }

  function passwordConfirmValidator(value) {
    if (password.value !== value) {
      return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  return (
    <div className="sign-up">
      <div className="wrap">
        <h1>회원가입</h1>
        <div className="form">
          <div className="label-with-input">
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              value={nickname.value}
              onChange={nickname.onChange}
              autoComplete="off"
            />
            <div className="error-message">
              {nickname.isValid ? "" : nickname.errorMessage}
            </div>
          </div>
          <div className="label-with-input">
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              value={email.value}
              onChange={email.onChange}
            />
            <div className="error-message">
              {email.isValid ? "" : email.errorMessage}
            </div>
          </div>
          <div className="label-with-input">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password.value}
              onChange={password.onChange}
            />
            <div className="error-message">
              {password.isValid ? "" : password.errorMessage}
            </div>
          </div>
          <div className="label-with-input">
            <label htmlFor="password-confirm">비밀번호 확인</label>
            <input
              type="password"
              id="password-confirm"
              value={passwordConfirm.value}
              onChange={passwordConfirm.onChange}
            />
            <div className="error-message">
              {passwordConfirm.isValid ? "" : passwordConfirm.errorMessage}
            </div>
          </div>
          <button className="button">회원가입 </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
