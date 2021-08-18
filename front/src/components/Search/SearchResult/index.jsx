import { PersonCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Wrapper } from "./styles";

function SearchResult({ image, nickname, userId }) {
  return (
    <Link to={`/profile/${userId}`}>
      <Wrapper>
        <img
          src={image}
          onError={(e) => {
            e.target.src =
              "https://www.voakorea.com/themes/custom/voa/images/Author__Placeholder.png";
          }}
        />
        <h3>{nickname}</h3>
      </Wrapper>
    </Link>
  );
}

export default SearchResult;
