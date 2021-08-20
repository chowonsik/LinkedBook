import { Wrapper, MessageBox } from "./styles";
function ConfirmBox({ text, isActive }) {
  return (
    <Wrapper isActive={isActive}>
      <MessageBox>{text}</MessageBox>
    </Wrapper>
  );
}

export default ConfirmBox;
