import React from "react";
import "./style.scss";

function UserDealItem({ dealObj }) {
  return (
    <section className="deal">
      <img className="img" src={dealObj.img} alt="book" />
      <div className="content">
        <h3 className="deal-title">{dealObj.deal_title}</h3>
        <h3 className="book-title">책 : {dealObj.title}</h3>
        <span className="author">저자 : {dealObj.author}</span>
        <span className="publisher">{dealObj.publisher}</span>
        <footer>
          <strong className="price">{dealObj.price}원</strong>
          <span className="created">{dealObj.time}</span>
          <span className="like-count">{dealObj.like}</span>
        </footer>
      </div>
    </section>
  );
}

export default UserDealItem;
