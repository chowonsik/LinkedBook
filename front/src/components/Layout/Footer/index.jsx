import {
  HouseDoorFill,
  BookFill,
  PlusCircleFill,
  ChatDots,
  PersonFill,
} from "react-bootstrap-icons";

import { Wrapper } from "./styles";

function Footer({ onClick }) {
  return (
    <>
      <Wrapper onClick={onClick}>
        <HouseDoorFill className="home-btn" />
        <BookFill className="search-book" />
        <PlusCircleFill className="new-post" />
        <ChatDots className="chat" />
        <PersonFill className="profile" />
      </Wrapper>
    </>
  );
}

export default Footer;
