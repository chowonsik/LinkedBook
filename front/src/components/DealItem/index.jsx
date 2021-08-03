import { Wrapper } from "./styles";
import { SuitHeart, SuitHeartFill } from "react-bootstrap-icons";

function DealItem({ dealObj }) {
  return (
    <Wrapper>
      <img className="book-image" src={dealObj.img} alt="book" />
      <div className="content">
        <h2 className="deal-title">{dealObj.deal_title}</h2>
        <h2 className="book-title">
          {dealObj.title}
          <span className="quality">{dealObj.quality}</span>
        </h2>
        <div className="detail">
          <div>
            <div>
              <span className="author">{dealObj.author}</span>
              <span className="publisher">{dealObj.publisher}</span>
            </div>
            <span className="created">{dealObj.time}</span>
          </div>
          <div>
            <strong className="price">{dealObj.price}원</strong>
            {dealObj.user_like ? (
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

export default DealItem;
