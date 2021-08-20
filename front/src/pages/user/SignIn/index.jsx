import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import OauthLogin from "../../../components/user/signin/OAuth";
import SignInForm from "../../../components/user/signin/SignInForm";
import useInput from "../../../hooks/useInput";
import { emailValidator, passwordValidator } from "../../../validators";
import { Wrapper } from "./style";
import { request } from "../../../api.js";
import { showToast } from "../../../actions/Notification";

export default function SignIn() {
  const history = useHistory();

  const email = useInput("", emailValidator);
  const password = useInput("", passwordValidator);
  const dispatch = useDispatch();
  async function handleLogin() {
    if (!email.isValid || !password.isValid) {
      dispatch(showToast("이메일과 패스워드를 확인해주세요."));
      return;
    }
    const data = {
      email: email.value,
      password: password.value,
    };
    const response = await request("POST", "/users/signin", data);
    if (response.isSuccess) {
      const loginUser = {
        email: email.value,
        id: response.result.userId,
        accessToken: response.result.accessToken,
      };
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      const needRecommend = localStorage.getItem("needRecommend");
      if (needRecommend === "false") {
        history.push({ pathname: "/" });
      } else {
        history.push({ pathname: "/recommend" });
      }
    } else {
      dispatch(showToast("가입하지 않은 이메일이거나, 잘못된 비밀번호입니다."));
      return;
    }
  }
  useEffect(() => {
    const onboarding = localStorage.getItem("onboarding");
    if (!onboarding) {
      history.push("/onboarding");
    }
    localStorage.removeItem("signUpValues");
  }, []);
  return (
    <>
      <Wrapper>
        <img src="logo.PNG" width="60%" alt="logo" />
        <SignInForm email={email} password={password} onClick={handleLogin} />
        <OauthLogin />
      </Wrapper>
    </>
  );
}
