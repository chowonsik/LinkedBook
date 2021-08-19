import {
  Wrapper,
  Content,
  ButtonGroup,
  CheckButton,
  CancleButton,
} from "./styles";

function AlarmFollowItem({
  userId,
  nickname,
  createdAt,
  onClickCheck,
  alarmId,
}) {
  return (
    <Wrapper>
      <Content>
        {nickname}님이 나의 서점을 팔로우 했어요.<span>{createdAt}</span>
      </Content>
      <ButtonGroup onClick={(e) => onClickCheck(e, alarmId)}>
        <CancleButton className="cancle">확인</CancleButton>
      </ButtonGroup>
    </Wrapper>
  );
}

export default AlarmFollowItem;
