import React from "react";
import {
  BookmarkFill,
  Circle,
  CircleFill,
  StarFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import { Content, Left, Right, Wrapper } from "./style";

export default function BookPopularInfo({ bookInfo }) {
  const history = useHistory();
  return (
    <Wrapper
      onClick={() => {
        history.push(`/books/${bookInfo.id}`);
      }}
    >
      <Content>
        <Left>
          <div className="title">{bookInfo.title}</div>
          <div className="image">
            <img src={bookInfo.image} alt="img" />
          </div>
        </Left>
        <Right>
          <div className="score">
            <div className="item">
              <span className="icon">
                <StarFill />
              </span>
              <span className="score">
                {bookInfo.popular ? bookInfo.popular.avgScore : 0} / 5
              </span>
            </div>
            <div className="item">
              <span className="icon">
                <BookmarkFill />
              </span>
              <span className="score">
                {bookInfo.like ? bookInfo.like.totalLikeCnt : 0}
              </span>
            </div>
          </div>
          <div className="tags">
            {bookInfo.popular &&
              bookInfo.popular.categories.map((tag, i) => (
                <span className="tag" key={i}>
                  #{tag.title}
                </span>
              ))}
          </div>
          <div className="reviews">
            <ul>
              {bookInfo.popular &&
                bookInfo.popular.comments.map((comment, i) => (
                  <li key={i}>
                    <span className="circle">
                      <CircleFill />
                    </span>
                    {comment.content}
                  </li>
                ))}
            </ul>
          </div>
        </Right>
      </Content>
    </Wrapper>
  );
}
