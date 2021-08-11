// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";
import { request, requestGet } from "../../../api";
import BookDetail from "../../../components/book/BookDetail";
import BookCommentItem from "../../../components/book/BookCommentItem";
import BookCommentModal from "../../../components/book/BookCommentModal";

const BookInfo = ({ match, history }) => {
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWR4IjoxOSwiaWF0IjoxNTk1NDAyMzU0LCJleHAiOjE2MjY5MzgzNTQsInN1YiI6InVzZXJJbmZvIn0.fzkgrs6wi4KPN2_TwFcvO2ab_dN2Ds46DEqQIvqBAD0";
  const {
    params: { isbn },
  } = match;
  const [bookInfo, setBookInfo] = useState([]);
  const [bookComments, setBookComments] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [starRatingState, setStarRatingState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

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

  const modalToggle = () => {
    setModalActive((prev) => !prev);
  };

  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      modalToggle();
    }
  };

  const handleStarRating = (e, idx) => {
    let clickStates = [...starRatingState];
    for (let i = 0; i < 5; i++) {
      if (i <= idx) clickStates[i] = true;
      else clickStates[i] = false;
    }
    setStarRatingState(clickStates);
  };

  const createComment = async () => {
    let score = 0;
    starRatingState.map((clicekdStar) => {
      if (clicekdStar) {
        score++;
      }
    });
    const commentData = { isbn, score, content: newComment };
    const response = await request("post", "/comments", commentData);
    getBookComments(isbn);

    modalToggle();
  };

  return (
    <Wrapper>
      <BookDetail bookInfo={bookInfo} />
      <div className="book-comments">
        <div className="section-header">
          <h4>한줄평</h4>
          <PencilFill onClick={modalToggle} />
        </div>
        <ul className="comments-list">
          {bookComments.map((comment, idx) => (
            <li key={idx}>
              <BookCommentItem comment={comment} />
            </li>
          ))}
        </ul>
      </div>
      <BookCommentModal
        modalToggle={modalToggle}
        modalActive={modalActive}
        handleModalOutsideClick={handleModalOutsideClick}
        setNewComment={setNewComment}
        newComment={newComment}
        starRatingState={starRatingState}
        handleStarRating={handleStarRating}
        createComment={createComment}
      />
    </Wrapper>
  );
};

export default BookInfo;
