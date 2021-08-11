import { useState } from "react";
import { Wrapper } from "./styles";
import { StarFill, Star, SuitHeart } from "react-bootstrap-icons";

const BookCommentItem = ({ comment, LOGIN_USER, deleteComment }) => {
  const commentTime = timeForToday(comment.created_at);
  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금 전";
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }
  return (
    <Wrapper>
      <img
        src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/service/a85d0594017900001.jpg"
        alt="user"
        className="user-img"
      />
      <div className="content">
        <header className="header">
          <span className="username">{comment.userNickname}</span>
          {comment.userId === LOGIN_USER && (
            <div className="btn">
              <button className="update-btn">수정</button>
              <button
                className="delete-btn"
                onClick={() => deleteComment(comment.commentId)}
              >
                삭제
              </button>
            </div>
          )}
        </header>
        <div className="book-evaluation">
          <div className="star-rating">
            {[0, 1, 2, 3, 4].map((el, idx) => {
              if (el < parseInt(comment.commentScore))
                return <StarFill key={idx} />;
              else return <Star key={idx} />;
            })}
          </div>
          <span> #감동적 #교훈적 #소장각</span>
        </div>

        <div className="book-comment">
          <div className="comment-info">
            <p className="comment">
              {comment.commentContent}{" "}
              <span className="created-time">{commentTime}</span>
            </p>
          </div>
          <span className="like">
            <span className="like-cnt">{comment.likeCommentCnt}</span>
            {/* 조건부로 주기 */}
            <SuitHeart className="heart-icon" />
          </span>
        </div>
      </div>
      <span></span>
    </Wrapper>
  );
};

export default BookCommentItem;
