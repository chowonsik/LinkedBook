import { Wrapper, Content, ItemAndIcon } from "./styles";
import { Link } from "react-router-dom";
import { ArrowReturnRight } from "react-bootstrap-icons";
function AlarmActItem({
  type,
  alarmId,
  userId,
  dealId,
  nickName,
  bookTitle,
  createdAt,
  onClick,
}) {
  if (type === "LIKE_DEAL") {
    return (
      <Link to={`/deal/${dealId}`} onClick={() => onClick(alarmId)}>
        <Wrapper>
          <Content>'{nickName}'님이 회원님의 글을 좋아합니다.</Content>{" "}
          <p className="created-at">{createdAt}</p>
        </Wrapper>
      </Link>
    );
  } else if (type === "LIKE_COMMENT") {
    return (
      <Wrapper onClick={() => onClick(alarmId)}>
        <Content>'{nickName}'님이 회원님의 한줄평을 좋아합니다.</Content>
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  } else if (type === "EVAL") {
    return (
      <Link to={`/deal/${dealId}`} onClick={() => onClick(alarmId)}>
        <Wrapper>
          <Content>
            '{bookTitle}'책의 구매가 확정되었습니다. 후기를 등록해볼까요?
          </Content>
          <p className="created-at">{createdAt}</p>
        </Wrapper>
      </Link>
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
            <ArrowReturnRight className="icon" />
          </ItemAndIcon>
        </Wrapper>
      </Link>
    );
  } else if (type === "NEW_DEAL_BOOK") {
    return (
      <Wrapper onClick={() => onClick(alarmId)}>
        <Content>'{bookTitle}'책이 입고되었습니다.</Content>
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  }
}

export default AlarmActItem;
