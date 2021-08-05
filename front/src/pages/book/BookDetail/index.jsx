import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Wrapper } from "./styles";

const BookDetail = ({ match, history }) => {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxOSwiaWF0IjoxNTk1NDAyMzU0LCJleHAiOjE2MjY5MzgzNTQsInN1YiI6InVzZXJJbmZvIn0.fzkgrs6wi4KPN2_TwFcvO2ab_dN2Ds46DEqQIvqBAD0";
  const [bookInfo, setBookInfo] = useState([]);
  const {
    params: { isbn },
  } = match;
  useEffect(() => {
    getBookInfo(isbn);
  }, []);
  const getBookInfo = async (isbn) => {
    axios
      .get(`/books/${isbn}`, {
        headers: {
          "X-ACCESS-TOKEN": TOKEN,
        },
      })
      .then((res) => {
        const bookData = {
          ...res.data.result.book,
          price: res.data.result.book.price.toLocaleString("ko-KR", {
            currency: "KRW",
          }),
        };
        setBookInfo(bookData);
      })
      .catch((err) => {});
  };

  return (
    <Wrapper>
      <div className="book-detail">
        <div onClick={history.goBack}>임시 뒤로가기</div>
        <img src={bookInfo.image} alt="book"></img>
        <h1>{bookInfo.title}</h1>
        <h2>{bookInfo.price}</h2>
        <strong>{bookInfo.likeCnt}</strong>
        <span>{bookInfo.author}</span>
        <span>{bookInfo.publisher}</span>
        <span>{bookInfo.dateTime}</span>
        <p>{bookInfo.contents}</p>
      </div>
    </Wrapper>
  );
};

export default BookDetail;
