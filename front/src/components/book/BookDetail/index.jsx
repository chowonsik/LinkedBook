import { StarFill, BookmarkFill } from "react-bootstrap-icons";
import { Wrapper } from "./styles";

const BookDetail = ({ bookInfo }) => {
  return (
    <Wrapper>
      <div className="img-box">
        <img src={bookInfo.image} className="book-img" alt="book"></img>
        <img
          src={bookInfo.image}
          className="background-img"
          alt="background-book"
          aria-hidden
        ></img>
      </div>
      <div className="book-detail">
        <div className="book-header">
          <h1 className="title">{bookInfo.title}</h1>
          <div>
            <strong className="score">
              <StarFill className="icon" />
              {bookInfo.commentAvgScore === "NaN"
                ? 0
                : bookInfo.commentAvgScore}
              / 5
            </strong>
            <strong className="bookmark-cnt">
              <BookmarkFill className="icon" />
              {bookInfo.likeBookCnt}
            </strong>
          </div>
        </div>
        <h2 className="price">{bookInfo.price} 원</h2>
        <div className="publishing-info">
          <span>{bookInfo.author}</span>
          <span>{bookInfo.publisher}</span>
          <span>{bookInfo.date}</span>
        </div>
        <p className="book-content">{bookInfo.contents}</p>
      </div>
    </Wrapper>
  );
};

export default BookDetail;
