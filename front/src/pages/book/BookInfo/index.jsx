// import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkFill, Bookmark, PencilFill } from "react-bootstrap-icons";
import { Wrapper, BookComments, Footer } from "./styles";
import { request, requestGet, requestDelete } from "../../../api";
import BookDetail from "../../../components/book/BookDetail";
import BookCommentItem from "../../../components/book/BookCommentItem";
import BookCommentModal from "../../../components/book/BookCommentModal";
import Header from "../../../components/Layout/Header";
import RoundButton from "../../../components/common/Buttons/RoundButton";
import ToastMessage from "../../../components/common/ToastMessage";
import { showToast } from "../../../actions/Notification";
import { createAlarm } from "../../../actions/Alarm";
import { getBookDeals } from "../../../actions/Books";

const BookInfo = ({ match, history }) => {
  const dispatch = useDispatch();
  const LOGIN_USER = JSON.parse(localStorage.getItem("loginUser")).id;
  const {
    params: { isbn },
  } = match;
  const areaId = useSelector((state) => state.userReducer.selectedArea);
  const [bookInfo, setBookInfo] = useState([]);
  const [bookComments, setBookComments] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [newComment, setNewComment] = useState({});
  const [editing, setEditing] = useState(false);
  const [isBookLike, setIsBookLike] = useState(false);
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
  const category = [
    "",
    "킬링타임",
    "몽환적",
    "가족애 ",
    "교훈적",
    "명작",
    "재밌는",
    "잔인한",
    "어려운",
    "등골오싹",
    "강추b",
    "소장각",
    "눈물버튼",
    "감성자극",
    "새로운관점",
    "이해쏙쏙",
    "자기계발",
    "로맨틱",
    "기분전환",
    "인생책",
    "유용해요",
    "수면제",
    "대반전",
    "상상력UP",
  ];

  useEffect(() => {
    getBookInfo();
    getBookComments();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  });

  const getBookInfo = async () => {
    const { result } = await requestGet(`/books/${isbn}`);
    const bookData = {
      ...result,
      price: result?.price.toLocaleString(),
      commentAvgScore: result?.commentAvgScore,
      date: `${result?.dateTime.substr(0, 4)}년 ${result?.dateTime.substr(
        5,
        2
      )}월 ${result?.dateTime.substr(8, 2)}일 출간`,
    };
    setBookInfo(bookData);
    setIsBookLike(bookData.like);
  };

  const infiniteScroll = () => {
    let { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight === scrollHeight) {
      getBookComments();
    }
  };

  const getBookComments = async () => {
    const { result } = await requestGet("/comments", {
      bookId: isbn,
      page: parseInt(bookComments.length / 5),
      size: 5,
    });
    if (bookComments.length < 5) {
      setBookComments(result);
    } else {
      setBookComments([...bookComments, ...result]);
    }
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
      dispatch(showToast("별점을 선택하세요."));
      return false;
    }
    if (!newComment.content) {
      dispatch(showToast("한줄평을 입력하세요."));
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
        dispatch(showToast("태그는 최대 3개까지 등록가능합니다."));
        return;
      }
    } else {
      selectedState[id] = !selectedState[id];
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
    modalToggle();
    await request("post", "/comments", commentData);
    const { result } = await requestGet("/comments", {
      bookId: isbn,
      page: 0,
      size: 5,
    });
    setBookComments(result);
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
    const updatedBookComments = bookComments.map((comment) =>
      comment.comment.id !== newComment.id
        ? comment
        : {
            ...comment,
            comment: {
              ...newComment,
              categories: tagData.map((tagNum) => {
                return { id: tagNum, title: category[tagNum] };
              }),
              created_at: comment.comment.created_at,
            },
          }
    );
    setBookComments(updatedBookComments);
    await request("patch", `/comments/${newComment.id}`, {
      ...newComment,
      categories: tagData,
    });
    modalToggle();
    getBookInfo();
  };

  const deleteComment = async (commentId) => {
    await requestDelete(`/comments/${commentId}`);
    setBookComments(
      bookComments.filter((comment) => comment.comment.id !== commentId)
    );
    getBookInfo();
  };

  const likeComment = async (commentId, commentLikeId) => {
    console.log(commentId);
    await request("post", "/like-comments", { id: commentId });
    setBookComments(
      bookComments.map((comment) =>
        comment.comment.id === commentId
          ? {
              ...comment,
              like: {
                id: comment.comment.id,
                userLike: !comment.like.userLike,
                totalLikeCnt: comment.like.totalLikeCnt + 1,
              },
            }
          : comment
      )
    );
    dispatch(createAlarm({ type: "LIKE_COMMENT", commentId: commentId }));
  };

  const unlikeComment = async (likeId) => {
    await requestDelete(`/like-comments/${likeId}`);
    setBookComments(
      bookComments.map((comment) =>
        comment.like.id === likeId
          ? {
              ...comment,
              like: {
                id: comment.like.id,
                userLike: !comment.like.userLike,
                totalLikeCnt: comment.like.totalLikeCnt - 1,
              },
            }
          : comment
      )
    );
  };

  const likeBook = async () => {
    setIsBookLike({ ...isBookLike, userLike: !isBookLike.userLike });
    await request("post", `/like-books`, { id: isbn });
    dispatch(showToast("관심책으로 등록되었습니다."));
    getBookInfo();
  };

  const unlikeBook = async () => {
    setIsBookLike({ ...isBookLike, userLike: !isBookLike.userLike });
    await requestDelete(`/like-books/${isBookLike.id}`);
    dispatch(showToast("관심책에서 삭제되었습니다."));
    getBookInfo();
  };

  const handleShowBookDeals = async () => {
    dispatch(getBookDeals(isbn, areaId));
    history.push(`/books/${isbn}/deals`);
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
                    likeComment={likeComment}
                    unlikeComment={unlikeComment}
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
        {isBookLike?.userLike && isBookLike.userLike ? (
          <BookmarkFill onClick={unlikeBook} className="bookmark-icon" />
        ) : (
          <Bookmark onClick={likeBook} className="bookmark-icon" />
        )}
        <RoundButton
          onClick={handleShowBookDeals}
          value="거래보기"
          width="70%"
        />
      </Footer>
    </>
  );
};

export default BookInfo;
