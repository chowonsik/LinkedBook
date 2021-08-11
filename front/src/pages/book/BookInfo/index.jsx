// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";
import { request, requestGet, requestDelete } from "../../../api";
import BookDetail from "../../../components/book/BookDetail";
import BookCommentItem from "../../../components/book/BookCommentItem";
import BookCommentModal from "../../../components/book/BookCommentModal";

const BookInfo = ({ match }) => {
  const LOGIN_USER = JSON.parse(localStorage.getItem("loginUser")).id;
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
    const { result } = await requestGet(`/books/${isbn}`);
    const bookData = {
      ...result,
      price: result.price.toLocaleString("ko-KR", {
        currency: "KRW",
      }),
      commentAvgScore: result.commentAvgScore.toFixed(1),
      date: `${result.dateTime.substr(0, 4)}년 ${result.dateTime.substr(
        5,
        2
      )}월 ${result.dateTime.substr(8, 2)}일 출간`,
    };
    setBookInfo(bookData);
  };

  const getBookComments = async (isbn) => {
    const { result } = await requestGet("/comments", {
      bookId: isbn,
      page: 0,
      size: 4,
    });
    console.log(result);
    setBookComments(result);
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
    // 토스트 메세지로 response 띄어주는 기능 추가
    getBookComments(isbn);
    modalToggle();
  };
  const deleteComment = async (commentId) => {
    // 지우는 값
    console.log(commentId);
    const response = await requestDelete(`/comments/${commentId}`);
    console.log(response);
    getBookComments(isbn);
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
          {bookComments.map((comment) => (
            <li key={comment.commentId}>
              <BookCommentItem
                comment={comment}
                LOGIN_USER={LOGIN_USER}
                deleteComment={deleteComment}
              />
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
        deleteComment={deleteComment}
      />
    </Wrapper>
  );
};

export default BookInfo;
