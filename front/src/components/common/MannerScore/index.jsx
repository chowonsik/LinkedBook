import { EmojiSmile, EmojiWink, EmojiLaughing } from "react-bootstrap-icons";
import { Wrapper } from "./styles";

function MannerScore({ score }) {
  if (score <= 3) {
    return (
      <Wrapper className="user-manner">
        <EmojiSmile className="good emoji" />
        <span className="good">{score}</span>
      </Wrapper>
    );
  } else if (score <= 4) {
    return (
      <Wrapper className="user-manner">
        <EmojiWink className="great emoji" />
        <span className="great">{score}</span>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper className="user-manner">
        <EmojiLaughing className="excellent emoji" />
        <span className="excellent">{score}</span>
      </Wrapper>
    );
  }
}

export default MannerScore;
