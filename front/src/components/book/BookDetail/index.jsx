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
          <div className="test">
            {bookInfo.popular && (
              <strong className="score">
                <StarFill className="icon" />
                <span>
                  {bookInfo.popular.avgScore === "NaN"
                    ? 0
                    : bookInfo.popular.avgScore}
                  / 5
                </span>
              </strong>
            )}
            <strong className="bookmark">
              <span className="bookmark-cnt">
                {bookInfo.like && bookInfo.like.totalLikeCnt}
              </span>
              <BookmarkFill className="icon" />
            </strong>
          </div>
        </div>
        <div className="sub-header">
          <h2 className="price">{bookInfo.price} 원</h2>
          <span className="categories">
            {bookInfo.popular &&
              bookInfo.popular.categories.map((category, idx) => (
                <span key={idx} className="category">
                  #{category.title}
                </span>
              ))}
          </span>
        </div>
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
