import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showToast } from "../../../actions/Notification";
import { LocationButton, Wrapper } from "./style";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Input from "../../../components/common/Input";
import useInput from "../../../hooks/useInput";
import {
  nicknameValidator,
  emailValidator,
  passwordValidator,
} from "../../../validators.js";
import Header from "../../../components/Layout/Header";
import { request } from "../../../api.js";
import RoundButton from '../../../components/common/Buttons/RoundButton';

export default function SignUp() {
  const signUpValues = JSON.parse(localStorage.getItem("signUpValues"));
  const nickname = useInput(
    signUpValues ? signUpValues.nickname : "",
    nicknameValidator
  );
  const email = useInput(
    signUpValues ? signUpValues.email : "",
    emailValidator
  );
  const emailCheck = useInput(
    signUpValues ? signUpValues.emailCheck : ""
  );
  const password = useInput(
    signUpValues ? signUpValues.password : "",
    passwordValidator
  );
  const passwordConfirm = useInput(
    signUpValues ? signUpValues.passwordConfirm : "",
    passwordConfirmValidator
  );
  const [auth, setAuth] = useState(signUpValues ? signUpValues.auth : "");
  const [area, setArea] = useState({});

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  function passwordConfirmValidator(value) {
    if (password.value !== value) {
      return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  async function handleSignUp() {
    console.log(auth);
    console.log(emailCheck.value);
    if (
      !nickname.isValid ||
      !email.isValid ||
      !password.isValid ||
      !passwordConfirm.isValid ||
      !area.areaId
    ) {
      dispatch(showToast("모든 항목을 입력하세요."));
      return;
    }
    if (emailCheck.value !== auth) {
      dispatch(showToast("이메일 인증이 필요합니다."));
      return;
    }
    const data = {
      email: email.value,
      nickname: nickname.value,
      password: password.value,
      info: "",
      image: "",
      areaId: area.areaId,
    };
    const response = await request("POST", "/users/signup", data);
    if (response.isSuccess) {
      dispatch(showToast("회원가입이 완료되었습니다."));
      history.push({ pathname: "/signin" });
    } else {
      if (response.code === 404) {
        dispatch(showToast("이미 사용중인 이메일입니다."));
      }
      if (response.code === 405) {
        dispatch(showToast("이미 사용중인 닉네임입니다."));
      }
      return;
    }
  }

  async function handleEmailAuth() {
    if (
      !email.isValid
    ) {
      dispatch(showToast("이메일을 입력하세요."));
      return;
    }
    const data = {
      email: email.value,
    };
    const response = await request("POST", "/users/email", data);
    if (response.isSuccess) {
      console.log(response.result.auth);
      setAuth(response.result.auth);
      dispatch(showToast("이메일로 인증번호를 발송했습니다."));
    } else {
      if (response.code === 400) {
        dispatch(showToast("이메일 인증번호 발송에 실패했습니다."));
      }
      return;
    }
  }

  function saveData() {
    const signUpValues = {
      nickname: nickname.value,
      email: email.value,
      emailCheck: emailCheck.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
      auth: auth,
    };
    localStorage.setItem("signUpValues", JSON.stringify(signUpValues));
  }

  useEffect(() => {
    if (location.state && location.state.area) {
      setArea(location.state.area);
    }
  }, []);

  return (
    <>
      <Header title="회원가입" isBack />
      <Wrapper>
        <Input
          type="text"
          placeholder="이메일"
          value={email.value}
          onChange={email.onChange}
          isValid={email.isValid}
          errorMessage={email.errorMessage}
        />
        <RoundButton value="이메일 인증" onClick={ handleEmailAuth }/>
        <Input
          type="text"
          placeholder="인증번호"
          value={emailCheck.value}
          onChange={emailCheck.onChange}
          isValid={emailCheck.isValid}
          errorMessage={emailCheck.errorMessage}
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
        <LocationButton
          onClick={() => {
            saveData();
            history.push({
              pathname: "/search/location",
              state: { isSignUp: true },
            });
          }}
          placeholder={area.areaFullName ? area.areaFullName : "지역 선택"}
        />
      </Wrapper>
      <FooterButton value="회원가입" onClick={handleSignUp} />
    </>
  );
}
