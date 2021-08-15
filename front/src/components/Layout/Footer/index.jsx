import {
  HouseDoor,
  HouseDoorFill,
  Book,
  BookFill,
  PlusCircleFill,
  ChatDots,
  Person,
  PersonFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import useFooter from "../../../hooks/useFooter.js";
import { Wrapper, IconBox } from "./styles";

function Footer() {
  const history = useHistory();
  const footer = useFooter();
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser"));
  return (
    <>
      <Wrapper onClick={footer.onClick}>
        <IconBox>
          {history.location.pathname === "/" ? (
            <HouseDoorFill />
          ) : (
            <HouseDoor className="home-btn" />
          )}
          <p>홈</p>
        </IconBox>
        <IconBox>
          {history.location.pathname === "/books" ? (
            <BookFill />
          ) : (
            <Book className="search-book" />
          )}
          <p>책 검색</p>
        </IconBox>
        <PlusCircleFill className="new-post" />
        <IconBox>
          <ChatDots className="chat" />
          <p>채팅</p>
        </IconBox>
        <IconBox>
          {LOGIN_USER_ID &&
          history.location.pathname === `/profile/${LOGIN_USER_ID.id}` ? (
            <PersonFill />
          ) : (
            <Person className="profile" />
          )}
          <p>프로필</p>
        </IconBox>
      </Wrapper>
    </>
  );
}

export default Footer;
