import React from "react";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import RecommendUserList from "../../../components/recommend/RecommendUserList";

import { Wrapper } from "./style";

export default function RecommendUser() {
  return (
    <>
      <Wrapper>
        <h1>Book Star</h1>
        <h2>인기 책방을 팔로우 해보세요</h2>
        <RecommendUserList />
      </Wrapper>
      <FooterButton value="건너뛰기" />
    </>
  );
}
