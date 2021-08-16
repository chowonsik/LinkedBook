import { Wrapper, Content } from "./styles";
function AlarmActItem({
  type,
  alarmId,
  dealId,
  nickName,
  bookTitle,
  createdAt,
}) {
  if (type === "LIKE_DEAL") {
    return (
      <Wrapper>
        <Content>{nickName}님이 회원님의 글을 좋아합니다.</Content>{" "}
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  } else if (type === "LIKE_COMMENT") {
    return (
      <Wrapper>
        <Content>{nickName}님이 회원님의 한줄평을 좋아합니다.</Content>
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  } else if (type === "EVAL") {
    return (
      <Wrapper>
        <Content>
          {bookTitle}책의 구매가 확정되었습니다. 후기를 등록해볼까요?
        </Content>
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  } else if (type === "NEW_DEAL_FOLLOW") {
    return (
      <Wrapper>
        <Content>{nickName}님의 책방에 새로운 책이 입고되었습니다.</Content>
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  } else if (type === "NEW_DEAL_BOOK") {
    return (
      <Wrapper>
        <Content>{bookTitle}책이 입고되었습니다.</Content>
        <p className="created-at">{createdAt}</p>
      </Wrapper>
    );
  }
}

export default AlarmActItem;
