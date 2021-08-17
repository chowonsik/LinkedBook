import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import { Wrapper } from "./styles";
import Input from "../../../components/common/Input";
import Textarea from "../../../components/common/Input/Textarea";
import Header from "../../../components/Layout/Header";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import { showToast } from "../../../actions/Notification";
import { getUserObj, updateUserObj } from "../../../actions/Profile";

const ProfileUpdate = () => {
  let history = useHistory();
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;
  const userObj = useSelector((state) => state.userProfileReducer.userObj);
  const dispatch = useDispatch();
  const nickname = useInput(userObj.nickname, nicknameValidator);
  const description = useInput(userObj.info, descValidator);
  const [userImg, setUserImg] = useState(userObj.image);
  const [changedData, setChangedData] = useState({});

  useEffect(() => {
    setChangedData({ ...changedData, image: userImg });
  }, [userImg]);
  useEffect(() => {
    setChangedData({ ...changedData, nickname: nickname.value });
  }, [nickname.value]);
  useEffect(() => {
    setChangedData({ ...changedData, info: description.value });
  }, [description.value]);

  function nicknameValidator(value) {
    if (value.length < 2 || value.length > 10) {
      return {
        isValid: false,
        errorMessage: "2글자 이상 10글자 이하로 입력해주세요",
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  function descValidator(value) {
    if (value.length > 80) {
      return {
        isValid: false,
        errorMessage: "80자 이내로 입력해주세요",
      };
    } else {
      return { isValid: true, errorMessage: "" };
    }
  }

  function onFileChange(event) {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onload = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setUserImg(result);
    };
    if (theFile) {
      reader.readAsDataURL(theFile);
    }
  }

  function handleLocationClick() {
    history.push("/search/location");
  }
  async function submitUserData() {
    await dispatch(updateUserObj(changedData));
    dispatch(showToast("프로필이 수정되었습니다."));
    await dispatch(getUserObj(LOGIN_USER_ID));
    history.push(`/profile/${LOGIN_USER_ID}`);
  }

  return (
    <>
      <Header isBack title="프로필 수정" />
      <Wrapper>
        <div className="user-image">
          <img src={userImg} alt="profile" />
          <label htmlFor="upload">프로필 사진 바꾸기 </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        <label htmlFor="nickname">닉네임</label>
        <Input
          id="nickname"
          type="text"
          placeholder="닉네임"
          value={nickname.value}
          onChange={nickname.onChange}
          isValid={nickname.isValid}
          errorMessage={nickname.errorMessage}
        />
        <label htmlFor="desc">프로필 설명</label>
        <Textarea
          id="desc"
          type="text"
          onChange={description.onChange}
          value={description.value}
          isValid={description.isValid}
          errorMessage={description.errorMessage}
          rows="3"
          cols="10"
        />

        <label htmlFor="location">내 지역</label>
        <Input
          onClick={handleLocationClick}
          className="location"
          type="text"
          id="location"
          value={userObj.dong}
          errorMessage
          readOnly
        />

        <Link to="/profile/update/password">
          <button className="change-password">비밀번호 변경</button>
        </Link>

        <button className="delete-account">회원 탈퇴</button>
      </Wrapper>
      <FooterButton value="완료" onClick={submitUserData} />
    </>
  );
};

export default ProfileUpdate;
