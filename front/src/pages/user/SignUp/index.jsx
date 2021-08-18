import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
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
import RoundButton from "../../../components/common/Buttons/RoundButton";

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
  const emailCheck = useInput(signUpValues ? signUpValues.emailCheck : "");
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

  const [oauthUserData, setOAuthUserData] = useState(
    signUpValues ? signUpValues.oauthUserData : null
  );

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
    if (password.value !== passwordConfirm.value) {
      dispatch(showToast("비밀번호를 확인해주세요."));
      return;
    }
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
    if (!oauthUserData?.authEmail && emailCheck.value !== auth) {
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
      ...oauthUserData,
    };
    const response = await request("POST", "/users/signup", data);
    if (response.isSuccess) {
      dispatch(showToast("회원가입이 완료되었습니다."));
      history.replace({ pathname: "/signin" });
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
    if (!email.isValid) {
      dispatch(showToast("이메일을 입력하세요."));
      return;
    }
    const data = {
      email: email.value,
    };
    const response = await request("POST", "/users/email", data);
    if (response.isSuccess) {
      setAuth(response.result.auth);
      dispatch(showToast("이메일로 인증번호를 발송했습니다."));
    } else {
      if (response.status === 400) {
        dispatch(showToast(response.message));
      } else {
        dispatch(showToast("인증 메일을 발송하는데 실패하였습니다."));
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
      oauthUserData: oauthUserData,
    };
    localStorage.setItem("signUpValues", JSON.stringify(signUpValues));
  }

  useEffect(() => {
    if (location.state && location.state.oauthUser) {
      const {
        nickname: _nickname,
        email: _email,
        ..._oauthUserData
      } = location.state.oauthUser;

      nickname.setValue(_nickname ?? "");
      email.setValue(_email ?? "");
      setOAuthUserData({
        authEmail: !!_email,
        oauth: _oauthUserData.type,
        oauthId: _oauthUserData.id,
        image: _oauthUserData.image,
      });
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.area) {
      setArea(location.state.area);
    }
  }, []);

  return (
    <>
      <Header title="회원가입" isBack />
      <Wrapper>
        <div className="email-container">
          <Input
            type="text"
            placeholder="이메일"
            value={email.value}
            onChange={email.onChange}
            isValid={email.isValid}
            errorMessage={email.errorMessage}
            readonly={!!oauthUserData?.authEmail}
          />
          {!oauthUserData?.authEmail && (
            <RoundButton
              value="인증"
              onClick={handleEmailAuth}
              width="125px"
              fontSize="15px"
            />
          )}
        </div>
        {!oauthUserData?.authEmail && (
          <>
            <Input
              type="text"
              placeholder="인증번호"
              value={emailCheck.value}
              onChange={emailCheck.onChange}
              isValid={emailCheck.isValid}
              errorMessage={emailCheck.errorMessage}
            />
          </>
        )}

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
              pathname: "/signup/search/location",
              state: { isSignUp: true },
            });
          }}
          placeholder={area.areaFullName ? area.areaFullName : "거래지역 선택"}
        />
      </Wrapper>
      <FooterButton value="회원가입" onClick={handleSignUp} />
    </>
  );
}
