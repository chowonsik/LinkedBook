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
  onClick,
  alarmId,
}) {
  return (
    <Wrapper>
      <Content>
        {nickname}님이 나의 서점을 팔로우 했어요.<span>{createdAt}</span>
      </Content>
      <ButtonGroup onClick={(e) => onClickCheck(e, alarmId)}>
        <CheckButton className="check" id={userId}>
          확인
        </CheckButton>
        <CancleButton className="cancle">취소</CancleButton>
      </ButtonGroup>
    </Wrapper>
  );
}

export default AlarmFollowItem;
