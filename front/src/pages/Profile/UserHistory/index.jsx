import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getBoughtBook,
  getLikeBook,
  getSoldBook,
  setLikeBook,
} from "../../../actions/MyHistory";
import { request, requestGet } from "../../../api";
import Header from "../../../components/Layout/Header";
import { ImgList, StyledImg, Wrapper } from "./styles";

function UserHistory({ match }) {
  const dispatch = useDispatch();
  const userId = match.params.id;
  const likeBook = useSelector((state) => state.myHistoryReducer.likeBook);
  const soldBook = useSelector((state) => state.myHistoryReducer.soldBook);
  const boughtBook = useSelector((state) => state.myHistoryReducer.boughtBook);

  useEffect(() => {
    dispatch(getLikeBook(userId));
    dispatch(getSoldBook(userId));
    dispatch(getBoughtBook(userId));
  }, []);

  async function handleLikeBookScroll(e) {
    const { scrollLeft, clientWidth, scrollWidth } = e.target;
    if (parseInt(scrollLeft) + parseInt(clientWidth) !== parseInt(scrollWidth))
      return;
    if (likeBook && likeBook.length % 10 !== 0) return;
    const page = parseInt(likeBook.length / 10);
    dispatch(getLikeBook(userId, page));
  }

  async function handleSoldBookScroll(e) {
    const { scrollLeft, clientWidth, scrollWidth } = e.target;
    if (parseInt(scrollLeft) + parseInt(clientWidth) !== parseInt(scrollWidth))
      return;
    if (likeBook && likeBook.length % 10 !== 0) return;
    const page = parseInt(likeBook.length / 10);
    dispatch(getLikeBook(userId, page));
  }

  async function handleBoughtBookScroll(e) {
    const { scrollLeft, clientWidth, scrollWidth } = e.target;
    if (parseInt(scrollLeft) + parseInt(clientWidth) !== parseInt(scrollWidth))
      return;
    if (likeBook && likeBook.length % 10 !== 0) return;
    const page = parseInt(likeBook.length / 10);
    dispatch(getLikeBook(userId, page));
  }
  return (
    <>
      <Header isBack title="나의 활동" />
      <Wrapper>
        <h2>관심 책</h2>
        <ImgList onScroll={handleLikeBookScroll}>
          {likeBook &&
            likeBook.map((bookObj, i) => (
              <Link to={{ pathname: `/books/${bookObj?.book.id}` }}>
                <StyledImg key={i} src={bookObj?.book.image} alt="book" />
              </Link>
            ))}
        </ImgList>
        <h2>판매완료</h2>
        <ImgList onScroll={handleSoldBookScroll}>
          {soldBook &&
            soldBook.map((dealObj, i) => (
              <Link to={{ pathname: `/deal/${dealObj?.dealId}` }}>
                <StyledImg key={i} src={dealObj?.imageUrl} alt="book" />
              </Link>
            ))}
        </ImgList>
        <h2>구매완료</h2>
        <ImgList onScroll={handleBoughtBookScroll}>
          {boughtBook &&
            boughtBook.map((dealObj, i) => (
              <Link to={{ pathname: `/deal/${dealObj?.dealId}` }}>
                <StyledImg key={i} src={dealObj?.imageUrl} alt="book" />
              </Link>
            ))}
        </ImgList>
        <button>유저의 한줄평 보러가기</button>
      </Wrapper>
    </>
  );
}

export default UserHistory;
