import { Wrapper, CancleButton, CheckButton, Buttons } from "./styles";
function CheckFollowCancle({ title, isActive, onClick }) {
  return (
    <Wrapper isActive={isActive}>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <Buttons onClick={onClick}>
          <CancleButton id="cancle">취소</CancleButton>
          <CheckButton id="check">확인</CheckButton>
        </Buttons>
      </div>
    </Wrapper>
  );
}

export default CheckFollowCancle;
