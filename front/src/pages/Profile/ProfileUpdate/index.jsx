import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import { Wrapper } from "./styles";
import Input from "../../../components/common/Input";
import Textarea from "../../../components/common/Input/Textarea";
import Header from "../../../components/Layout/Header";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import { showToast } from "../../../actions/Notification";
import { getUserObj, updateUserObj } from "../../../actions/Profile";
import { request } from "../../../api";
import ReactS3Client from "../../../S3.js";

const ProfileUpdate = () => {
  const history = useHistory();
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;

  const userObj = useSelector((state) => state.userProfileReducer.userObj);
  const dispatch = useDispatch();
  const nickname = useInput(userObj.nickname, nicknameValidator);
  const description = useInput(userObj.info, descValidator);
  const [userImg, setUserImg] = useState(userObj.image);
  const [changedData, setChangedData] = useState({});
  const [listHeight, setListHeight] = useState(window.innerHeight - 260);

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

  // s3 서버에 업로드 할 유니크한 파일 이름
  function getFileName(file) {
    const today = new Date();
    const fileName = `user-${today.getFullYear()}${
      today.getMonth() + 1
    }${today.getDate()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}${today.getMilliseconds()}${
      file.name
    }`;
    return fileName;
  }

  // s3 서버에 이미지 업로드 하고 {url, order} 리스트 반환
  async function getImage(image) {
    if (image.files) {
      const file = image.files[0];
      const newFileName = getFileName(file);
      await ReactS3Client.uploadFile(file, newFileName)
        .then((data) => {
          setUserImg(data.location);
        })
        .catch((err) => console.error(err));
    }
  }

  // 파일읽기
  function handleImageReader(file) {
    // 보여주기 위한 사진정보를 추출
    let reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }
  // 사용자가 업로드한 이미지 postImg state에 저장
  async function handleImageCreate(e) {
    const fileNm = e.target.value;
    const fileList = e.target.files;
    if (!fileNm) {
      return false;
    }
    const ext = fileNm.slice(fileNm.lastIndexOf(".") + 1).toLowerCase();
    if (!(ext === "gif" || ext === "jpg" || ext === "png" || ext === "jpeg")) {
      dispatch(
        showToast("이미지파일 (.jpg, .png, .gif ) 만 업로드 가능합니다.")
      );
      e.target.value = "";
      return false;
    }
    const file = fileList[0];

    let imgUrl = await handleImageReader(file);
    let tempImage = {
      imgUrl: imgUrl,
      files: [file],
    };
    getImage(tempImage);
  }

  function handleLocationClick() {
    dispatch(updateUserObj(changedData));
    history.push({
      pathname: "/search/location",
      state: { isProfileUpdate: true },
    });
  }

  async function submitUserData() {
    dispatch(updateUserObj(changedData));
    dispatch(showToast("프로필이 수정되었습니다."));
    await dispatch(getUserObj(LOGIN_USER_ID));
    history.push(`/profile/${LOGIN_USER_ID}`);
  }

  function handleLogoutClick() {
    localStorage.removeItem("loginUser");
    history.push(`/signin`);
  }

  async function handleDeleteAccountClick() {
    await request("patch", "/users/deactivate");
    localStorage.removeItem("loginUser");
    history.push(`/signin`);
  }

  return (
    <>
      <Header isBack title="프로필 수정" />
      <Wrapper height={listHeight}>
        <div className="user-image">
          <img
            src={userImg}
            alt="profile"
            onError={(e) => {
              e.target.src =
                "https://www.voakorea.com/themes/custom/voa/images/Author__Placeholder.png";
            }}
          />
          <label htmlFor="upload">프로필 사진 바꾸기 </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={handleImageCreate}
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

        <button onClick={handleLocationClick} className="change-password">
          비밀번호 변경
        </button>
        <div className="manage-account">
          <button onClick={handleDeleteAccountClick} className="delete-account">
            회원 탈퇴
          </button>
          <button onClick={handleLogoutClick} className="logout">
            로그아웃
          </button>
        </div>
      </Wrapper>
      <FooterButton value="완료" onClick={submitUserData} />
    </>
  );
};

export default ProfileUpdate;
