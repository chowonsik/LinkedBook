import { Wrapper } from "./styles";

const BookItem = ({ bookObj }) => {
  const price = bookObj.price.toLocaleString("ko-KR", {
    currency: "KRW",
  });
  return (
    <Wrapper>
      <img className="book-image" src={bookObj.thumbnail} alt="book" />
      <div className="content">
        <div className="book-info">
          <h2 className="book-title">{bookObj.title}</h2>
          <span className="author">{bookObj.authors[0]}</span>
          <span className="publisher">{bookObj.publisher}</span>
        </div>
        <strong className="price">{price} 원</strong>
      </div>
    </Wrapper>
  );
};

export default BookItem;
