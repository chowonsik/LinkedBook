import React from "react";
import MannerScore from "../../../components/common/MannerScore";

import Header from "../../../components/Layout/Header";
import { BookInfo, Footer, Image, UserInfo, Wrapper } from "./style";
export default function DealDetail() {
  return (
    <>
      <Header title="거래 정보" isBack />
      <Wrapper>
        <Image>
          <img src="https://placeimg.com/1000/500/any" alt="책 이미지" />
        </Image>
        <UserInfo>
          <div className="image-container">
            <img src="https://placeimg.com/100/100/any" alt="책 이미지" />
          </div>
          <div className="text-container">
            <span className="nickname">변대웅</span>
            <span className="dong">덕명동</span>
          </div>
          <div className="score-container">
            <MannerScore score={4.5} />
          </div>
        </UserInfo>
        <BookInfo>
          <div className="deal-title">책 팔아요</div>
          <div className="deal-price">2,000원</div>
          <div className="book-info">
            <span className="book-title">습관의 힘</span>
            <span className="deal-quality">중</span>
          </div>
          <div className="book-author">저자 : 찰스 두히그</div>
          <div className="book-publisher">출판사 : 갤리온</div>
          <div className="book-price">정가 : 14,400원</div>
        </BookInfo>
      </Wrapper>
      <Footer>
        <div className="icon-container"></div>
        <div className="button-container"></div>
      </Footer>
    </>
  );
}
