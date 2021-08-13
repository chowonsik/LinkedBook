// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BookmarkFill, PencilFill } from "react-bootstrap-icons";
import { Wrapper, BookComments, Footer } from "./styles";
import { request, requestGet, requestDelete } from "../../../api";
import BookDetail from "../../../components/book/BookDetail";
import BookCommentItem from "../../../components/book/BookCommentItem";
import BookCommentModal from "../../../components/book/BookCommentModal";
import Header from "../../../components/Layout/Header";
import RoundButton from "../../../components/common/Buttons/RoundButton";

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
    false,
  ]);
  const [selectedTag, setSelectedTag] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    getBookInfo();
    getBookComments();
  }, []);

  const getBookInfo = async () => {
    const { result } = await requestGet(`/books/${isbn}`);
    const bookData = {
      ...result,
      price: result.price.toLocaleString("ko-KR", {
        currency: "KRW",
      }),
      commentAvgScore: result.commentAvgScore,
      date: `${result.dateTime.substr(0, 4)}년 ${result.dateTime.substr(
        5,
        2
      )}월 ${result.dateTime.substr(8, 2)}일 출간`,
    };
    setBookInfo(bookData);
  };

  const getBookComments = async () => {
    const { result } = await requestGet("/comments", {
      bookId: isbn,
      page: 0,
      size: 5,
    });
    setBookComments(result);
  };

  const modalToggle = () => {
    setModalActive((prev) => !prev);
    setEditing(false);
    setStarRatingState([false, false, false, false, false]);
    setSelectedTag([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
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

  const handleTagClick = (id) => {
    let selectedState = [...selectedTag];
    let selectedCnt = 0;
    for (let i = 0; i < 24; i++) {
      if (selectedState[i]) {
        selectedCnt++;
      }
    }
    if (selectedCnt >= 3) {
      if (selectedState[id]) {
        selectedState[id] = false;
      } else {
        alert("태그는 최대 3개까지 등록가능합니다.");
        return;
      }
    } else {
      selectedState[id] = true;
    }
    setSelectedTag(selectedState);
  };

  const findSelectedTag = () => {
    let tagData = [];
    for (let i = 0; i < 24; i++) {
      if (selectedTag[i]) {
        tagData.push(i);
      }
    }
    return tagData;
  };

  const createComment = async () => {
    const valid = validCheck();
    const tagData = findSelectedTag();
    if (!valid) return;
    const commentData = { isbn, ...newComment, categories: tagData };
    await request("post", "/comments", commentData);
    modalToggle();
    getBookComments();
    getBookInfo();
  };

  const onUpdateClick = async ({ comment }) => {
    setEditing(true);
    handleStarRating(comment.score);
    let selectedState = [...selectedTag];
    comment.categories.map((category) => (selectedState[category.id] = true));
    setSelectedTag(selectedState);
    setNewComment({
      id: comment.id,
      content: comment.content,
      score: comment.score,
    });
    setModalActive((prev) => !prev);
  };

  const updateComment = async () => {
    const valid = validCheck();
    if (!valid) return;
    const tagData = findSelectedTag();
    await request("patch", `/comments/${newComment.id}`, {
      ...newComment,
      categories: tagData,
    });
    modalToggle();
    getBookComments();
    getBookInfo();
  };
  const deleteComment = async (commentId) => {
    await requestDelete(`/comments/${commentId}`);
    getBookComments();
    getBookInfo();
  };

  const createLikeComment = async (commentId) => {
    await request("post", "/like-comments", { id: commentId });
    getBookComments();
  };

  const deleteLikeComment = async (commentId) => {
    await requestDelete(`/like-comments/${parseInt(commentId)}`);
    getBookComments();
  };

  return (
    <>
      <Header isBack isSearch isAlarm title={bookInfo.title} />
      <Wrapper>
        <BookDetail bookInfo={bookInfo} />
        <div className="book-comments-container">
          <div className="section-header">
            <h4>한줄평</h4>
            <PencilFill onClick={modalToggle} />
          </div>
          <BookComments>
            {bookComments &&
              bookComments.map((commentInfo, idx) => (
                <li key={idx}>
                  <BookCommentItem
                    commentInfo={commentInfo}
                    LOGIN_USER={LOGIN_USER}
                    deleteComment={deleteComment}
                    onUpdateClick={onUpdateClick}
                    createLikeComment={createLikeComment}
                    deleteLikeComment={deleteLikeComment}
                  />
                </li>
              ))}
          </BookComments>
        </div>
        <BookCommentModal
          modalToggle={modalToggle}
          modalActive={modalActive}
          handleModalOutsideClick={handleModalOutsideClick}
          setNewComment={setNewComment}
          newComment={newComment}
          handleTagClick={handleTagClick}
          starRatingState={starRatingState}
          handleStarRating={handleStarRating}
          createComment={createComment}
          updateComment={updateComment}
          editing={editing}
          selectedTag={selectedTag}
        />
      </Wrapper>
      <Footer>
        <BookmarkFill className="bookmark-icon" />
        <RoundButton value="거래보기" width="70%" />
      </Footer>
    </>
  );
};

export default BookInfo;
