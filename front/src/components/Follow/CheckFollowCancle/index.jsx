import {
  Wrapper,
  CancleButton,
  CheckButton,
  Buttons,
  Container,
} from "./styles";
function CheckFollowCancle({ title, isActive, onClick }) {
  return (
    <Wrapper isActive={isActive}>
      <Container>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <Buttons onClick={onClick}>
            <CancleButton id="cancle">취소</CancleButton>
            <CheckButton id="check">확인</CheckButton>
          </Buttons>
        </div>
      </Container>
    </Wrapper>
  );
}

export default CheckFollowCancle;
