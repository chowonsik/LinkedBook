import { Wrapper } from "./styles";
import {
  StarFill,
  Star,
  SuitHeart,
  SuitHeartFill,
} from "react-bootstrap-icons";
import { Link, useHistory } from "react-router-dom";

const BookCommentItem = ({
  commentInfo,
  LOGIN_USER,
  deleteComment,
  onUpdateClick,
  likeComment,
  unlikeComment,
}) => {
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
  return (
    <Wrapper>
      <img
        src={commentInfo.user.image}
        alt="user"
        onClick={() => {
          window.scrollTo(0, 0);
          history.push(`/profile/${commentInfo.user.id}`);
        }}
        onError={(e) => {
          e.target.src =
            "https://www.voakorea.com/themes/custom/voa/images/Author__Placeholder.png";
        }}
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
              <span className="created-time">
                {dateToString(commentInfo.user.created_at)}
              </span>
            </p>
          </div>
          <span className="like">
            <Link to={{ pathname: `/comment/${commentInfo.comment.id}/likes` }}>
              <span className="like-cnt">{commentInfo.like.totalLikeCnt}</span>
            </Link>
            {commentInfo.like.userLike ? (
              <SuitHeartFill
                onClick={() => unlikeComment(commentInfo.like.id)}
                className="heart-fill-icon"
              />
            ) : (
              <SuitHeart
                onClick={() =>
                  likeComment(commentInfo.comment.id, commentInfo.like.id)
                }
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
