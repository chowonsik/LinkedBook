import React from "react";
import RecommendUserListItem from "../RecommendUserListItem";

import { Wrapper } from "./style";

export default function RecommendUserList({ userList }) {
  return (
    <>
      <Wrapper>
        {userList.map((user) => (
          <RecommendUserListItem user={user} key={user.userId} />
        ))}
      </Wrapper>
    </>
  );
}
