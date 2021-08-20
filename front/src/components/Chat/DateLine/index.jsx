import React from "react";
import { Wrapper } from "./style";

export default function DateLine({ date }) {
  return (
    <Wrapper>
      <div className="line"></div>
      <div className="date-string">{`${date.getFullYear()}년 ${
        date.getMonth() + 1
      }월 ${date.getDate()}일`}</div>
      <div className="line"></div>
    </Wrapper>
  );
}
