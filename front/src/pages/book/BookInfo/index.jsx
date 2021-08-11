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
  const [editing, setEditing] = useState(false);
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
    setBookComments(result);
  };

  const modalToggle = () => {
    setModalActive((prev) => !prev);
    setEditing(false);
    setStarRatingState([false, false, false, false, false]);
    setNewComment("");
  };

  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      modalToggle();
    }
  };

  const handleStarRating = (num) => {
    let clickStates = [...starRatingState];
    let score = 0;
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        clickStates[i] = true;
        score++;
      } else clickStates[i] = false;
    }
    setStarRatingState(clickStates);
    setNewComment({ ...newComment, score });
  };

  const validCheck = () => {
    if (!newComment.score) {
      alert("별점을 선택하세요.");
      return false;
    }
    if (!newComment.content) {
      alert("한줄평을 입력하세요.");
      return false;
    }
    return true;
  };

  const createComment = async () => {
    const valid = validCheck();
    if (!valid) return;
    const commentData = { isbn, ...newComment };
    await request("post", "/comments", commentData);
    modalToggle();
    getBookComments(isbn);
  };

  const onUpdateClick = async ({ commentContent, commentScore, commentId }) => {
    setEditing(true);
    handleStarRating(commentScore);
    setNewComment({
      id: commentId,
      content: commentContent,
      score: commentScore,
    });
    setModalActive((prev) => !prev);
  };

  const updateComment = async () => {
    const valid = validCheck();
    if (!valid) return;
    await request("patch", `/comments/${newComment.id}`, newComment);
    modalToggle();
    getBookComments(isbn);
  };
  const deleteComment = async (commentId) => {
    await requestDelete(`/comments/${commentId}`);
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
                onUpdateClick={onUpdateClick}
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
        updateComment={updateComment}
        editing={editing}
      />
    </Wrapper>
  );
};

export default BookInfo;
