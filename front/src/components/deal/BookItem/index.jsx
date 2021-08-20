import { Wrapper } from "./style";

export default function BookItem({ book, onBookClick }) {
  return (
    <Wrapper
      onClick={() => {
        onBookClick({ ...book, authors: book.authors.join(", ") });
      }}
    >
      <div className="thumbnail">
        <img src={book.thumbnail} alt="thumbnail" />
      </div>
      <div className="info">
        <div className="title">{book.title}</div>
        <div className="author">저자 : {book.authors.join(", ")}</div>
        <div className="publisher">출판사 : {book.publisher}</div>
        <div className="price">정가 : {book.price}원</div>
      </div>
    </Wrapper>
  );
}
