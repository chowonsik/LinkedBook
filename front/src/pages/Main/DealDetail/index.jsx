import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleFill,
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
export default function DealDetail() {
  const [book, setBook] = useState({});
  const [deal, setDeal] = useState({ images: [] });
  const [user, setUser] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

  function goLeft() {
    if (selectedIndex === 0) return;
    setSelectedIndex(selectedIndex - 1);
  }
  function goRight() {
    if (selectedIndex === deal.images.length - 1) return;
    setSelectedIndex(selectedIndex + 1);
  }

  useEffect(() => {
    setBook({
      title: "습관의 힘",
      author: "찰스 두히그",
      publisher: "갤리온",
      price: "14,400원",
    });
    setDeal({
      title: "책 팔아요",
      price: "2,000원",
      quality: "중",
      images: [
        "https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F996DE5445B734C3205AE78",
        "https://placeimg.com/1000/500/tech",
        "https://placeimg.com/900/500/animals",
        "https://placeimg.com/800/500/architecture",
      ],
    });
    setUser({
      nickname: "변대웅",
      dong: "덕명동",
      mannerScore: 4.5,
      image: "https://placeimg.com/100/100/people",
    });
  }, []);

  return (
    <>
      <Header title="거래 정보" isBack />
      <Wrapper>
        <ImageWrapper>
          <ImageContainer index={selectedIndex}>
            {deal.images.map((image) => (
              <img src={image} alt="책 이미지" />
            ))}
          </ImageContainer>
          <div
            className={`left-icon ${
              deal.images.length === 0 || selectedIndex === 0 ? "hide" : ""
            }`}
            onClick={goLeft}
          >
            <ChevronLeft />
          </div>
          <div
            className={`right-icon ${
              deal.images.length === 0 ||
              selectedIndex === deal.images.length - 1
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
            {deal.images.map((image, i) =>
              i === selectedIndex ? (
                <div className="circle selected">
                  <CircleFill />
                </div>
              ) : (
                <div className="circle">
                  <CircleFill />
                </div>
              )
            )}
          </div>
        </ImageWrapper>
        <UserInfo>
          <div className="image-container">
            <img src={user.image} alt="유저 프로필 이미지" />
          </div>
          <div className="text-container">
            <span className="nickname">{user.nickname}</span>
            <span className="dong">{user.dong}</span>
          </div>
          <div className="score-container">
            <MannerScore score={user.mannerScore} />
          </div>
        </UserInfo>
        <Section>
          <BookInfo>
            <div className="deal-title">{deal.title}</div>
            <div className="deal-price">{deal.price}</div>
            <div className="book-info">
              <span className="book-title">{book.title}</span>
              <span className="deal-quality">{deal.quality}</span>
            </div>
            <div className="book-author">저자 : {book.author}</div>
            <div className="book-publisher">출판사 : {book.publisher}</div>
            <div className="book-price">정가 : {book.price}</div>
          </BookInfo>
          <DealState>
            <div className="complete-button">거래 완료</div>
            <div className="review-button">거래 후기 남기기</div>
            <div className="review-button">후기 작성 완료</div>
          </DealState>
        </Section>
      </Wrapper>
      <Footer>
        <div className="icon-container">
          <HeartFill color={colors.yellow} size="24px" />
        </div>
        <div className="button-container">
          <RoundButton value="수정하기" width="40%" fontSize={fonts.xl} />
          <RoundButton
            value="삭제하기"
            width="40%"
            fontSize={fonts.xl}
            backgroundColor={colors.red}
          />
        </div>
      </Footer>
    </>
  );
}
