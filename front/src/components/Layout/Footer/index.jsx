import {
  HouseDoorFill,
  BookFill,
  PlusCircleFill,
  ChatDots,
  PersonFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import { Wrapper } from "./styles";

function Footer({ onClick }) {
  const history = useHistory();
  return (
    <>
      <Wrapper onClick={onClick}>
        <HouseDoorFill className="home-btn" />
        <BookFill className="search-book" />
        <PlusCircleFill
          className="new-post"
          onClick={() => {
            history.push({ pathname: "/deal" });
          }}
        />
        <ChatDots className="chat" />
        <PersonFill className="profile" />
      </Wrapper>
    </>
  );
}

export default Footer;
