import React, { useEffect } from "react";
import Input from "../../../components/common/Input";
import OAuth from "../../../components/user/signin/OAuth";
import SignInForm from "../../../components/user/signin/SignInForm";
import useInput from "../../../hooks/useInput";
import { emailValidator, passwordValidator } from "../../../validators";
import { Wrapper } from "./style";
import { request } from "../../../api.js";
import { useHistory } from "react-router-dom";

export default function SignIn() {
  const history = useHistory();

  const email = useInput("", emailValidator);
  const password = useInput("", passwordValidator);

  async function handleLogin() {
    if (!email.isValid || !password.isValid) {
      alert("이메일과 패스워드를 확인하세요");
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
      alert("이메일과 패스워드를 확인하세요");
      return;
    }
  }
  useEffect(() => {
    localStorage.removeItem("signUpValues");
  }, []);
  return (
    <>
      <Wrapper>
        <img src="logo.PNG" width="60%" alt="logo" />
        <SignInForm email={email} password={password} onClick={handleLogin} />
        <OAuth />
      </Wrapper>
    </>
  );
}
