import React from "react";
import Input from "../../../components/common/Input";
import OAuth from "../../../components/signin/OAuth";
import SignInForm from "../../../components/signin/SignInForm";
import useInput from "../../../hooks/useInput";
import { emailValidator, passwordValidator } from "../../../validators";
import { Wrapper } from "./style";

export default function SignIn() {
  const email = useInput("", emailValidator);
  const password = useInput("", passwordValidator);
  return (
    <>
      <Wrapper>
        <img src="logo.PNG" width="60%" alt="logo" />
        <SignInForm email={email} password={password} />
        <OAuth />
      </Wrapper>
    </>
  );
}
