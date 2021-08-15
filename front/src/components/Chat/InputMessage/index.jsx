import { CursorFill } from "react-bootstrap-icons";
import { Wrapper, Input } from "./styles";

function InputMessage({ onChange, value, onClick, onKeyUp, inputRef }) {
  return (
    <Wrapper>
      <Input
        placeholder="메시지를 입력하세요."
        onChange={onChange}
        onKeyUp={onKeyUp}
        value={value}
        ref={inputRef}
      />
      <CursorFill className="send-icon" onClick={onClick} />
    </Wrapper>
  );
}

export default InputMessage;
