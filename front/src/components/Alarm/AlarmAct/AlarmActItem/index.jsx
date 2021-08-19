import { Wrapper, Content, ItemAndIcon } from "./styles";
import { Link } from "react-router-dom";
import { ArrowRightCircleFill } from "react-bootstrap-icons";

function AlarmActItem({
  type,
  alarmId,
  userId,
  nickName,
  bookTitle,
  createdAt,
  onClick,
  onClickDealDone,
  evalId,
  isbn,
  fromUser,
}) {
  if (type === "LIKE_DEAL") {
    return (
      <Link to={`/profile/${userId}`} onClick={() => onClick(alarmId)}>
        <Wrapper>
          <Content>'{nickName}'님이 회원님의 글을 좋아합니다. </Content>
          <ItemAndIcon>
            <p className="created-at">{createdAt}</p>
            <ArrowRightCircleFill className="icon" />
          </ItemAndIcon>
        </Wrapper>
      </Link>
    );
  } else if (type === "LIKE_COMMENT") {
    return (
      <Link to={`/books/${isbn}`} onClick={() => onClick(alarmId)}>
        <Wrapper>
          <Content>'{nickName}'님이 회원님의 한줄평을 좋아합니다.</Content>
          <ItemAndIcon>
            <p className="created-at">{createdAt}</p>
            <ArrowRightCircleFill className="icon" />
          </ItemAndIcon>
        </Wrapper>
      </Link>
    );
  } else if (type === "EVAL") {
    return (
      <Wrapper onClick={() => onClickDealDone(alarmId, evalId, fromUser)}>
        <Content>
          '{bookTitle}'책의 구매가 확정되었습니다. 후기를 등록해볼까요?
        </Content>
        <ItemAndIcon>
          <p className="created-at">{createdAt}</p>
          <ArrowRightCircleFill className="icon" />
        </ItemAndIcon>
      </Wrapper>
    );
  } else if (type === "NEW_DEAL_FOLLOW") {
    return (
      <Link to={`/profile/${userId}`} onClick={() => onClick(alarmId)}>
        <Wrapper>
          <Content>
            '{nickName}'님의 책방에 새로운 책이 입고되었습니다. 구경하러
            가볼까요?
          </Content>
          <ItemAndIcon>
            <p className="created-at">{createdAt}</p>
            <ArrowRightCircleFill className="icon" />
          </ItemAndIcon>
        </Wrapper>
      </Link>
    );
  } else if (type === "NEW_DEAL_BOOK") {
    return (
      <Link to={`/profile/${userId}`} onClick={() => onClick(alarmId)}>
        <Wrapper>
          <Content>관심책으로 등록한 책이 새롭게 입고되었습니다. </Content>
          <ItemAndIcon>
            <p className="created-at">{createdAt}</p>
            <ArrowRightCircleFill className="icon" />
          </ItemAndIcon>
        </Wrapper>
      </Link>
    );
  }
}

export default AlarmActItem;
