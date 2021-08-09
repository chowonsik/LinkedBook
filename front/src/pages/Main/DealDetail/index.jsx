import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleFill,
  Heart,
  HeartFill,
  InfoCircle,
} from "react-bootstrap-icons";
import MannerScore from "../../../components/common/MannerScore";

import Header from "../../../components/Layout/Header";
import RoundButton from "../../../components/common/Buttons/RoundButton";
import { colors, fonts } from "../../../styles";
import {
  BookInfo,
  DealState,
  Footer,
  ImageContainer,
  ImageWrapper,
  Section,
  UserInfo,
  Wrapper,
} from "./style";
import { useParams } from "react-router-dom";
import { requestGet } from "../../../api";
export default function DealDetail() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { dealId } = useParams();
  const [dealData, setDealData] = useState({
    dealImages: [],
  });

  function goLeft() {
    if (selectedIndex === 0) return;
    setSelectedIndex(selectedIndex - 1);
  }
  function goRight() {
    if (selectedIndex === dealData.dealImages.length - 1) return;
    setSelectedIndex(selectedIndex + 1);
  }

  async function fetchData() {
    const response = await requestGet(`/deals/${dealId}`);
    setDealData(response.result);
    console.log(response.result);
  }

  function getLoginUser() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    return loginUser;
  }

  function priceToString(price) {
    return price ? price.toLocaleString() : 0;
  }

  useEffect(() => {
    fetchData();
    getLoginUser();
  }, []);

  return (
    <>
      <Header title="거래 정보" isBack />
      <Wrapper>
        <ImageWrapper>
          <ImageContainer index={selectedIndex}>
            {dealData.dealImages.map((image, i) => (
              <img
                src={image.imageurl}
                alt="책 이미지"
                key={i}
                onError={(e) => (e.target.style.display = "none")}
              />
            ))}
          </ImageContainer>
          <div
            className={`left-icon ${
              dealData.dealImages.length === 0 || selectedIndex === 0
                ? "hide"
                : ""
            }`}
            onClick={goLeft}
          >
            <ChevronLeft />
          </div>
          <div
            className={`right-icon ${
              dealData.dealImages.length === 0 ||
              selectedIndex === dealData.dealImages.length - 1
                ? "hide"
                : ""
            }`}
            onClick={goRight}
          >
            <ChevronRight />
          </div>
          <div className="info-icon">
            <InfoCircle />
          </div>
          <div className="circles">
            {dealData.dealImages.map((image, i) =>
              i === selectedIndex ? (
                <div className="circle selected" key={i}>
                  <CircleFill />
                </div>
              ) : (
                <div className="circle" key={i}>
                  <CircleFill />
                </div>
              )
            )}
          </div>
        </ImageWrapper>
        <UserInfo>
          <div className="image-container">
            <img
              src={dealData.userImage}
              alt=""
              onError={(e) => {
                e.target.src = "https://placeimg.com/100/100/people";
              }}
            />
          </div>
          <div className="text-container">
            <span className="nickname">{dealData.userNickname}</span>
            <span className="dong">{dealData.userDong}</span>
          </div>
          <div className="score-container">
            <MannerScore score={dealData.userMannerScore} />
          </div>
        </UserInfo>
        <Section>
          <BookInfo>
            <div className="deal-title">{dealData.dealTitle}</div>
            <div className="deal-price">
              {priceToString(dealData.dealPrice)}원
            </div>
            <div className="book-info">
              <span className="book-title">{dealData.bookTitle}</span>
              <span className="deal-quality">{dealData.dealQuality}</span>
            </div>
            <div className="book-author">저자 : {dealData.bookAuthor}</div>
            <div className="book-publisher">
              출판사 : {dealData.bookPublisher}
            </div>
            <div className="book-price">
              정가 : {priceToString(dealData.bookPrice)}원
            </div>
          </BookInfo>
          <DealState>
            {dealData.userId === getLoginUser().id ? (
              <div className="complete-button">거래 완료</div>
            ) : (
              ""
            )}
            {/* <div className="review-button">거래 후기 남기기</div> */}
            {/* <div className="review-button">후기 작성 완료</div> */}
          </DealState>
        </Section>
      </Wrapper>
      <Footer>
        <div className="icon-container">
          {dealData.isLikeDeal === 1 ? (
            <HeartFill color={colors.yellow} size="24px" />
          ) : (
            <Heart color={colors.yellow} size="24px" />
          )}
        </div>
        <div className="button-container">
          {dealData.userId === getLoginUser().id ? (
            <RoundButton value="수정하기" width="40%" fontSize={fonts.xl} />
          ) : (
            <RoundButton value="거래하기" width="40%" fontSize={fonts.xl} />
          )}
          {dealData.userId === getLoginUser().id ? (
            <RoundButton
              value="삭제하기"
              width="40%"
              fontSize={fonts.xl}
              backgroundColor={colors.red}
            />
          ) : (
            <RoundButton
              value="신고하기"
              width="40%"
              fontSize={fonts.xl}
              backgroundColor={colors.red}
            />
          )}
        </div>
      </Footer>
    </>
  );
}
