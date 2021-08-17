import React from "react";
import {
  Star,
  StarFill,
  SuitHeart,
  SuitHeartFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { Wrapper } from "./styles";

const CommentItem = ({ commentInfo }) => {
  const history = useHistory();
  function dateToString(date) {
    const today = new Date();
    const timeValue = new Date(date);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }
  function textSlicer(text) {
    if (text.length > 20) {
      return text.slice(0, 16) + "...";
    }
    return text;
  }
  return (
    <Wrapper onClick={() => history.push(`/books/${commentInfo.book.id}`)}>
      <img src={commentInfo.book.image} alt="book" className="book-img"></img>
      <div className="comment-content">
        <ul className="category-list">
          {commentInfo.comment.categories.map((category) => (
            <li>#{category.title}</li>
          ))}
        </ul>
        <h2 className="comment">{commentInfo.comment.content}</h2>
        <div className="score">
          <div className="stars">
            {[0, 1, 2, 3, 4].map((num, i) => {
              return (
                <span key={i} className="star">
                  {num < parseInt(commentInfo.comment.score) ? (
                    <StarFill />
                  ) : (
                    <Star />
                  )}
                </span>
              );
            })}
          </div>
          <h2 className="created-time">
            {dateToString(commentInfo.comment.created_at)}
          </h2>
        </div>
        <div className="footer">
          <span className="book-title">
            {textSlicer(commentInfo.book.title)}
          </span>
          <div className="like">
            <span className="comment-like-cnt">
              {commentInfo.like.totalLikeCnt}
            </span>
            {commentInfo.like.userLike ? (
              <SuitHeartFill className="heart-fill-icon" />
            ) : (
              <SuitHeart className="heart-icon" />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CommentItem;
