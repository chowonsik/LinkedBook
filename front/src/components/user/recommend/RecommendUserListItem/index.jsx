import React from "react";
import { colors, fonts } from "../../../../styles";
import RoundButton from "../../../common/Buttons/RoundButton";

import { ButtonWrapper, ImageWrapper, TextWrapper, Wrapper } from "./style";

export default function RecommendUserListItem({ url, nickname, book }) {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src={url} alt="profile" />
      </ImageWrapper>
      <TextWrapper>
        <div className="nickname">{nickname}</div>
        <div className="count-book">등록한 책 : {book}</div>
      </TextWrapper>
      <ButtonWrapper>
        <RoundButton
          value="팔로우"
          width="54px"
          height="32px"
          borderRadius="10px"
          fontSize={fonts.md}
          backgroundColor={colors.yellow}
        />
      </ButtonWrapper>
    </Wrapper>
  );
}
