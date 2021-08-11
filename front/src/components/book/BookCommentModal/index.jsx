import { Wrapper } from "./styles";
import { StarFill, Star } from "react-bootstrap-icons";

const BookCommentModal = ({
  starRatingState,
  setNewComment,
  modalToggle,
  modalActive,
  handleModalOutsideClick,
  handleStarRating,
  createComment,
}) => {
  return (
    <Wrapper>
      {modalActive ? (
        <div className="modal-overlay" onClick={handleModalOutsideClick}>
          <div className="modal-window">
            <header>
              <h5>한줄평 작성</h5>
            </header>
            <span>태그들어갈자리</span>
            <div className="star-rating">
              {[0, 1, 2, 3, 4].map((idx) => {
                return (
                  <span
                    key={idx}
                    className="star"
                    onClick={(e) => handleStarRating(e, idx)}
                  >
                    {starRatingState[idx] ? <StarFill /> : <Star />}
                  </span>
                );
              })}
            </div>
            <input
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              type="text"
            />
            <footer>
              <button onClick={createComment}>등록</button>
              <button onClick={modalToggle}>취소</button>
            </footer>
          </div>
        </div>
      ) : null}
    </Wrapper>
  );
};

export default BookCommentModal;
