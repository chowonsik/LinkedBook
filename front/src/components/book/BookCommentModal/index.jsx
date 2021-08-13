import { Wrapper } from "./styles";
import { StarFill, Star } from "react-bootstrap-icons";

const BookCommentModal = ({
  starRatingState,
  newComment,
  editing,
  setNewComment,
  modalToggle,
  modalActive,
  handleModalOutsideClick,
  handleStarRating,
  createComment,
  updateComment,
  handleTagClick,
  selectedTag,
}) => {
  const category = [
    "#킬링타임",
    "#몽환적",
    "#가족애 ",
    "#교훈적",
    "#명작",
    "#재밌는",
    "#잔인한",
    "#어려운",
    "#등골오싹",
    "#강추b",
    "#소장각",
    "#눈물버튼",
    "#감성자극",
    "#새로운관점",
    "#이해쏙쏙",
    "#자기계발",
    "#로맨틱",
    "#기분전환",
    "#인생책",
    "#유용해요",
    "#수면제",
    "#대반전",
    "#상상력UP",
  ];
  return (
    <Wrapper>
      {modalActive ? (
        <div className="modal-overlay" onClick={handleModalOutsideClick}>
          <div className="modal-window">
            <header>
              <h5>한줄평 작성</h5>
            </header>
            <ul className="category-list">
              {category.map((el, idx) => (
                <li
                  key={idx + 1}
                  className={selectedTag[idx + 1] ? "selected" : ""}
                  onClick={(e) => handleTagClick(idx + 1)}
                >
                  {el}
                </li>
              ))}
            </ul>
            <div className="star-rating">
              {[0, 1, 2, 3, 4].map((idx) => {
                return (
                  <span
                    key={idx}
                    className="star"
                    onClick={() => handleStarRating(idx + 1)}
                  >
                    {starRatingState[idx] ? <StarFill /> : <Star />}
                  </span>
                );
              })}
            </div>
            <input
              onChange={(e) => {
                setNewComment({ ...newComment, content: e.target.value });
              }}
              value={newComment.content || ""}
              type="text"
            />
            <footer>
              {editing ? (
                <button onClick={() => updateComment()}>수정</button>
              ) : (
                <button onClick={createComment}>등록</button>
              )}
              <button onClick={modalToggle}>취소</button>
            </footer>
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

export default BookCommentModal;
