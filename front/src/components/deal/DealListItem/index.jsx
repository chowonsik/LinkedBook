import { Wrapper } from "./styles";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

function DealListItem({
  dealObj,
  onClick,
  addLikeDeal,
  deleteLikeDeal,
  width,
}) {
  const [dealTitleWidth, setDealTitleWidth] = useState(
    window.innerWidth - 90 - 70
  );
  useEffect(() => {
    window.addEventListener("resize", setTitleWidth);

    return () => {
      window.removeEventListener("resize", setTitleWidth);
    };
  });
  function setTitleWidth() {
    setDealTitleWidth(window.innerWidth - 90 - 70);
  }
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
    if (text.length > 16) {
      return text.slice(0, 13) + "...";
    }
    return text;
  }
  function authorPublisherTextSlicer(text) {
    if (text.length > 8) {
      return text.slice(0, 5) + "...";
    }
    return text;
  }

  return (
    <Wrapper onClick={onClick} width={width} titleWidth={dealTitleWidth}>
      <div className="image-container">
        <img
          className="book-image"
          src={dealObj.dealImage}
          alt="book"
          onError={(e) => {
            e.target.src =
              "https://historyexplorer.si.edu/sites/default/files/book-348.jpg";
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
              <span className="author">
                {authorPublisherTextSlicer(dealObj.bookAuthor)}
              </span>
              <span className="publisher">
                {authorPublisherTextSlicer(dealObj.bookPublisher)}
              </span>
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
              <span
                className="icon heart-filled"
                onClick={(e) => {
                  deleteLikeDeal(dealObj.dealId, e);
                }}
              >
                <SuitHeartFill />
              </span>
            ) : (
              <span
                className="icon heart"
                onClick={(e) => {
                  addLikeDeal(dealObj.dealId, e);
                }}
              >
                <SuitHeart />
              </span>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default DealListItem;
