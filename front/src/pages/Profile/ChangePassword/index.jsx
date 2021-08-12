import { React } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Wrapper } from "./styles";
import useInput from "../../../hooks/useInput";
import { passwordValidator } from "../../../validators.js";
import Input from "../../../components/common/Input";
import Header from "../../../components/Layout/Header";
import { updateUserProfile } from "../../../actions/Users";

const ChangePassword = () => {
  let history = useHistory();

  const password = useInput("", passwordValidator);
  const passwordConfirm = useInput("", passwordConfirmValidator);
  const dispatch = useDispatch();

  function passwordConfirmValidator(value) {
    if (password.value !== value) {
      return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  function updatePassword() {
    dispatch(updateUserProfile({ password: password.value }));
    // 비밀번호 변경 메세지 띄우기
    history.go(-1);
  }

  return (
    <>
      <Header
        isBack
        isDone
        title="비밀번호 변경"
        DoneBtnClick={updatePassword}
      />
      <Wrapper>
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
