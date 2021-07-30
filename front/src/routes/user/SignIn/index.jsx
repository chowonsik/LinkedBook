import "./style.scss";
import useInput from "../../../hooks/useInput";

const SignIn = () => {
  const email = useInput("", emailValidator);
  const password = useInput("", passwordValidator);

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

  return (
    <div className="sign-in">
      <div className="wrap">
        <h1>로그인</h1>
        <div className="form">
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

          <button className="button button-main">로그인</button>
          <div>
            <img
              className="button"
              src="./assets/images/kakao/complete/ko/kakao_login_medium_wide.png"
              alt="kakao login"
            />
          </div>
          <div>
            <img
              className="button"
              src="./assets/images/naver/btnG_완성형.png"
              alt="naver login"
            />
          </div>
          <div className="message">
            아직 회원이 아니십니까? <u>회원가입</u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
