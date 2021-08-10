import React from "react";
import { useHistory } from "react-router-dom";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Header from "../../../components/Layout/Header";
import RecommendUserList from "../../../components/user/recommend/RecommendUserList";

import { Wrapper } from "./style";

export default function RecommendUser() {
  const history = useHistory();
  function handlePassButtonClick() {
    localStorage.setItem("needRecommend", "false");
    history.push({ pathname: "/" });
  }
  return (
    <>
      <Header title="책방 추천" isBack />
      <Wrapper>
        <h1>Book Star</h1>
        <h2>인기 책방을 팔로우 해보세요</h2>
        <RecommendUserList />
      </Wrapper>
      <FooterButton value="건너뛰기" onClick={handlePassButtonClick} />
    </>
  );
}
