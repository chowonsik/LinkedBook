import { EmojiSmile, EmojiWink, EmojiLaughing } from "react-bootstrap-icons";
import { Wrapper } from "./styles";

function MannerScore({ score }) {
  if (score <= 3) {
    return (
      <Wrapper className="user-manner">
        <EmojiSmile className="good emoji" />
        <span className="good">{Math.ceil(score * 100) / 100}</span>
      </Wrapper>
    );
  } else if (score <= 4) {
    return (
      <Wrapper className="user-manner">
        <EmojiWink className="great emoji" />
        <span className="great">
          {Math.ceil((score + Number.EPSILON) * 100) / 100}
        </span>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper className="user-manner">
        <EmojiLaughing className="excellent emoji" />
        <span className="excellent">
          {Math.ceil((score + Number.EPSILON) * 100) / 100}
        </span>
      </Wrapper>
    );
  }
}

export default MannerScore;
