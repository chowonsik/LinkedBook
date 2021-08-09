import { React } from "react";
import { Wrapper } from "./styles";
import useInput from "../../../hooks/useInput";
import { passwordValidator } from "../../../validators.js";
import Input from "../../../components/common/Input";
import Header from "../../../components/Layout/Header";

const ChangePassword = () => {
  const password = useInput("", passwordValidator);
  const passwordConfirm = useInput("", passwordConfirmValidator);

  function passwordConfirmValidator(value) {
    if (password.value !== value) {
      return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }
  return (
    <>
      <Header isBack isDone title="비밀번호 변경" />
      <Wrapper>
        <label htmlFor="current">현재 비밀번호</label>
        <Input
          id="current"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
        />
        <label htmlFor="new">새로운 비밀번호</label>
        <Input
          id="new"
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          value={password.value}
          onChange={password.onChange}
          isValid={password.isValid}
          errorMessage={password.errorMessage}
        />
        <label htmlFor="newConfirm">비밀번호 확인</label>
        <Input
          id="newConfirm"
          type="password"
          placeholder="새로운 비밀번호를 입력하세요"
          value={passwordConfirm.value}
          onChange={passwordConfirm.onChange}
          isValid={passwordConfirm.isValid}
          errorMessage={passwordConfirm.errorMessage}
        />
      </Wrapper>
    </>
  );
};

export default ChangePassword;
