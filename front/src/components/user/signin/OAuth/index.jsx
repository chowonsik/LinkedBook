import React from "react";
import { ChatFill } from "react-bootstrap-icons";
import { KaKaoButton, Wrapper } from "./style";

export default function OAuth() {
  return (
    <Wrapper>
      <div className="message">간편 로그인</div>
      <div className="icon-container">
        <div className="icon google">
          <a href="/api/auth/google">
          <img src="images/google.png" alt="google" />
          </a>
        </div>
        <div className="icon">
          <KaKaoButton>
            <a href="/api/auth/kakao">
              <ChatFill size={"18px"} />
            </a>
          </KaKaoButton>
        </div>
      </div>
    </Wrapper>
  );
}
