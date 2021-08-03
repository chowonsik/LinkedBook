import React from "react";
import Input from "../../../common/Input";
import RoundButton from "../../../common/Buttons/RoundButton";
import { Link } from "react-router-dom";
import { Wrapper } from "./style";

export default function SignInForm({ email, password, onClick }) {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="이메일"
        value={email.value}
        onChange={email.onChange}
        isValid={email.isValid}
        errorMessage={email.errorMessage}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password.value}
        onChange={password.onChange}
        isValid={password.isValid}
        errorMessage={password.errorMessage}
      />
      <RoundButton value="로그인" width={"100%"} onClick={onClick} />
      <div className="sign-up-message">
        <span className="message">아직 회원이 아니신가요?</span>
        <Link to="/signup">
          <span className="sign-up-button">회원가입</span>
        </Link>
      </div>
    </Wrapper>
  );
}
