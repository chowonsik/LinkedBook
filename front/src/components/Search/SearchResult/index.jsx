import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Wrapper } from "./styles";

function SearchResult({ image, nickname, userId }) {
  return (
    <Link to={`/profile/${userId}`}>
      <Wrapper>
        {image ? (
          <img src={image} />
        ) : (
          <PersonCircle className="profile-icon" />
        )}
        <h3>{nickname}</h3>
      </Wrapper>
    </Link>
  );
}

export default SearchResult;
