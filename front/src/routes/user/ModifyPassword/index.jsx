import "./style.scss";
import useInput from "../../../hooks/useInput";

const ModifyPassword = () => {
  const password = useInput("", passwordValidator);
  const passwordChange = useInput("", passwordChangeValidator);
  const passwordChangeConfirm = useInput("", passwordChangeConfirmValidator);

  function passwordValidator(value) {
    return { isValid: true, errorMessage: "" };
  }

  function passwordChangeValidator(value) {
    return { isValid: true, errorMessage: "" };
  }

  function passwordChangeConfirmValidator(value) {
    if (passwordChange.value !== value) {
      return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다" };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }
  return (
    <div className="modify-password">
      <div className="wrap">
        <h1>비밀번호 변경(헤더)</h1>
        <div className="label-with-input">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password.value}
            onChange={password.onChange}
          />
          <div className="error-message"></div>
        </div>
        <div className="label-with-input">
          <label htmlFor="password-change">변경할 비밀번호</label>
          <input
            type="password"
            id="password-change"
            value={passwordChange.value}
            onChange={passwordChange.onChange}
          />
          <div className="error-message"></div>
        </div>
        <div className="label-with-input">
          <label htmlFor="password-change-confirm">비밀번호 확인</label>
          <input
            type="password"
            id="password-change-confirm"
            value={passwordChangeConfirm.value}
            onChange={passwordChangeConfirm.onChange}
          />
          <div className="error-message">
            {passwordChangeConfirm.isValid
              ? ""
              : passwordChangeConfirm.errorMessage}
          </div>
        </div>
        <button className="button">비밀번호 변경</button>
      </div>
    </div>
  );
};

export default ModifyPassword;
