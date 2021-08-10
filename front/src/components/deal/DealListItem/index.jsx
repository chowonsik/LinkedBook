import { Wrapper } from "./styles";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";

function DealListItem({ dealObj, onClick }) {
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
  function priceToString(price) {
    return price.toLocaleString();
  }
  function textSlicer(text) {
    if (text.length > 15) {
      return text.slice(0, 12) + "...";
    }
    return text;
  }
  return (
    <Wrapper onClick={onClick}>
      <div className="image-container">
        <img
          className="book-image"
          src={dealObj.dealImage}
          alt="book"
          onError={(e) => {
            e.target.style.visibility = "hidden";
          }}
        />
      </div>
      <div className="content">
        <div className="deal-title">{dealObj.dealTitle}</div>
        <div className="book-title">
          {textSlicer(dealObj.bookTitle)}
          <span className="quality">{dealObj.dealQuality}</span>
        </div>
        <div className="detail">
          <div>
            <div>
              <span className="author">{dealObj.bookAuthor}</span>
              <span className="publisher">{dealObj.bookPublisher}</span>
            </div>
            <span className="created">
              {dateToString(dealObj.dealCreatedAt)}
            </span>
          </div>
          <div>
            <strong className="price">
              {priceToString(dealObj.dealPrice)}원
            </strong>
            {dealObj.isLikeDeal === 1 ? (
              <SuitHeartFill className="heart-filled" />
            ) : (
              <SuitHeart className="heart" />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default DealListItem;
