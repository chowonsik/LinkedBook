import { PersonCircle } from "react-bootstrap-icons";
import { Wrapper } from "./styles";

function SearchResult({ image, nickname, userId }) {
  return (
    <Wrapper>
      {image ? <img src={image} /> : <PersonCircle className="profile-icon" />}
      <h3>{nickname}</h3>
    </Wrapper>
  );
}

export default SearchResult;
