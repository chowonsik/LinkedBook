// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { StarFill, BookmarkFill, PencilFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";
import { request, requestGet } from "../../../api";
import BookCommentItem from "../../../components/book/BookCommentItem";

const BookDetail = ({ match, history }) => {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxOSwiaWF0IjoxNTk1NDAyMzU0LCJleHAiOjE2MjY5MzgzNTQsInN1YiI6InVzZXJJbmZvIn0.fzkgrs6wi4KPN2_TwFcvO2ab_dN2Ds46DEqQIvqBAD0";
  const [bookInfo, setBookInfo] = useState([]);
  const [bookComments, setBookComments] = useState([]);
  const {
    params: { isbn },
  } = match;
  useEffect(() => {
    getBookInfo(isbn);
    getBookComments(isbn);
  }, []);

  const getBookInfo = async (isbn) => {
    const response = await request("get", `/books/${isbn}`, {
      headers: {
        "X-ACCESS-TOKEN": TOKEN,
      },
    });
    const bookData = {
      ...response.result,
      price: response.result.price.toLocaleString("ko-KR", {
        currency: "KRW",
      }),
      date: `${response.result.dateTime.substr(
        0,
        4
      )}년 ${response.result.dateTime.substr(
        5,
        2
      )}월 ${response.result.dateTime.substr(8, 2)}일 출간`,
    };
    setBookInfo(bookData);
  };

  const getBookComments = async (isbn) => {
    const response = await requestGet("/comments", {
      bookId: isbn,
      page: 0,
      size: 4,
    });
    setBookComments(response.result);
  };

  return (
    <Wrapper>
      <div className="img-box">
        <img src={bookInfo.image} className="book-img" alt="book"></img>
        <img
          src={bookInfo.image}
          className="background-img"
          alt="background-book"
          aria-hidden
        ></img>
      </div>
      <div className="book-detail">
        <div className="book-header">
          <h1 className="title">{bookInfo.title}</h1>
          <div>
            <strong className="score">
              <StarFill className="icon" />
              {bookInfo.commentAvgScore} / 5
            </strong>
            <strong className="bookmark-cnt">
              <BookmarkFill className="icon" />
              {bookInfo.likeBookCnt}
            </strong>
          </div>
        </div>
        <h2 className="price">{bookInfo.price} 원</h2>
        <div className="book-info">
          <span>{bookInfo.author}</span>
          <span>{bookInfo.publisher}</span>
          <span>{bookInfo.date}</span>
        </div>
        <p className="book-content">{bookInfo.contents}</p>
        <div className="book-comments">
          <div>
            <h4>한줄평</h4>
            <PencilFill />
          </div>
          <ul className="comments-list">
            {bookComments.map((comment, idx) => (
              <li key={idx}>
                <BookCommentItem comment={comment} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default BookDetail;
