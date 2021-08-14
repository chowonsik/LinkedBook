import { useState } from "react";
import { Wrapper } from "./styles";
import {
  StarFill,
  Star,
  SuitHeart,
  SuitHeartFill,
} from "react-bootstrap-icons";

const BookCommentItem = ({
  commentInfo,
  LOGIN_USER,
  deleteComment,
  onUpdateClick,
  likeComment,
  unlikeComment,
}) => {
  const commentTime = timeForToday(commentInfo.user.created_at);
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
          <span className="username">{commentInfo.user.nickname}</span>
          {commentInfo.user.id === LOGIN_USER && (
            <div className="btn">
              <button
                className="update-btn"
                onClick={() => onUpdateClick(commentInfo)}
              >
                수정
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteComment(commentInfo.comment.id)}
              >
                삭제
              </button>
            </div>
          )}
        </header>
        <div className="book-evaluation">
          <div className="star-rating">
            {[0, 1, 2, 3, 4].map((el, idx) => {
              if (el < parseInt(commentInfo.comment.score))
                return <StarFill key={idx} />;
              else return <Star key={idx} />;
            })}
          </div>
          <ul className="comment-category-list">
            {commentInfo["comment"].categories.map((category, idx) => (
              <li key={idx}>#{category.title}</li>
            ))}
          </ul>
        </div>

        <div className="book-comment">
          <div className="comment-info">
            <p className="comment">
              {commentInfo.comment.content}
              <span className="created-time">{commentTime}</span>
            </p>
          </div>
          <span className="like">
            <span className="like-cnt">{commentInfo.like.totalLikeCnt}</span>
            {commentInfo.like.userLike ? (
              <SuitHeartFill
                onClick={() => unlikeComment(commentInfo.like.id)}
                className="heart-fill-icon"
              />
            ) : (
              <SuitHeart
                onClick={() => likeComment(commentInfo.comment.id)}
                className="heart-icon"
              />
            )}
          </span>
        </div>
      </div>
      <span></span>
    </Wrapper>
  );
};

export default BookCommentItem;
