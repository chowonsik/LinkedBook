import React from "react";
import RecommendUserListItem from "../RecommendUserListItem";

import { Wrapper } from "./style";

export default function RecommendUserList() {
  return (
    <>
      <Wrapper>
        <RecommendUserListItem
          url="https://placeimg.com/100/100/people"
          nickname="대웅짱1234"
          book={22}
        />
        <RecommendUserListItem
          url="https://placeimg.com/200/200/people"
          nickname="원시경"
          book={19}
        />
        <RecommendUserListItem
          url="https://placeimg.com/400/300/people"
          nickname="해위"
          book={15}
        />
        <RecommendUserListItem
          url="https://placeimg.com/100/200/people"
          nickname="abcdefg"
          book={14}
        />
      </Wrapper>
    </>
  );
}
