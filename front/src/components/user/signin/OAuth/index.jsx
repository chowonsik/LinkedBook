import React from "react";
import { ChatFill } from "react-bootstrap-icons";

import { KaKaoButton, Wrapper } from "./style";

export default function OAuth() {
  return (
    <Wrapper>
      <div className="message">간편 로그인</div>
      <div className="icon-container">
        <div className="icon google">
          <img src="images/google.png" alt="google" />
        </div>
        <div className="icon">
          <KaKaoButton>
            <ChatFill size={"18px"} />
          </KaKaoButton>
        </div>
      </div>
    </Wrapper>
  );
}
