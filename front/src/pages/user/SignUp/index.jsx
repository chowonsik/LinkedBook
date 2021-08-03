import React, { useState } from "react";

import { LocationButton, Wrapper } from "./style";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Input from "../../../components/common/Input";
import useInput from "../../../hooks/useInput";
import {
  nicknameValidator,
  emailValidator,
  passwordValidator,
} from "../../../validators.js";
import { Link } from "react-router-dom";

export default function SignUp() {
  const nickname = useInput("", nicknameValidator);
  const email = useInput("", emailValidator);
  const password = useInput("", passwordValidator);
  const passwordConfirm = useInput("", passwordConfirmValidator);
  const [location, setLocation] = useState("지역 설정");

  function passwordConfirmValidator(value) {
    if (password.value !== value) {
      return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  return (
    <>
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
          type="text"
          placeholder="닉네임"
          value={nickname.value}
          onChange={nickname.onChange}
          isValid={nickname.isValid}
          errorMessage={nickname.errorMessage}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password.value}
          onChange={password.onChange}
          isValid={password.isValid}
          errorMessage={password.errorMessage}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm.value}
          onChange={passwordConfirm.onChange}
          isValid={passwordConfirm.isValid}
          errorMessage={passwordConfirm.errorMessage}
        />
        <Link to="/search/location">
          <LocationButton placeholder={location} />
        </Link>
      </Wrapper>
      <FooterButton value="회원가입" />
    </>
  );
}
