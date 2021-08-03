import React from "react";
import { colors, fonts } from "../../../../styles";
import RoundButton from "../../../common/Buttons/RoundButton";

import { ButtonWrapper, ImageWrapper, TextWrapper, Wrapper } from "./style";

export default function RecommendUserListItem() {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="https://placeimg.com/100/100/any" alt="profile" />
      </ImageWrapper>
      <TextWrapper>
        <div className="nickname">웅파고</div>
        <div className="count-book">등록한 책 : 22</div>
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
