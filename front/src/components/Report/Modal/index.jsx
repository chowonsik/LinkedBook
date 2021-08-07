import { Wrapper, ModalContent } from "./styles";
function Modal({ text, isActive }) {
  return (
    <Wrapper isActive={isActive}>
      <ModalContent>{text}</ModalContent>
    </Wrapper>
  );
}

export default Modal;
