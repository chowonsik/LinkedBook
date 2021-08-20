import {
  HouseDoor,
  HouseDoorFill,
  Book,
  BookFill,
  PlusCircleFill,
  ChatDots,
  ChatDotsFill,
  Person,
  PersonFill,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import useFooter from "../../../hooks/useFooter.js";
import { Wrapper, IconBox, NewPostBtn } from "./styles";

function Footer() {
  const history = useHistory();
  const footer = useFooter();
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser"));
  return (
    <>
      <Wrapper>
        <IconBox onClick={footer.onClick} className="home-btn">
          {history.location.pathname === "/" ? (
            <HouseDoorFill />
          ) : (
            <HouseDoor className="home-btn" />
          )}
          <p className="home-btn">홈</p>
        </IconBox>
        <IconBox onClick={footer.onClick} className="search-book">
          {history.location.pathname === "/books" ? (
            <BookFill />
          ) : (
            <Book className="search-book" />
          )}
          <p className="search-book">책 검색</p>
        </IconBox>
        <IconBox className="new-post" onClick={footer.onClick}>
          <NewPostBtn className="new-post" onClick={footer.onClick}>
            <p className="new-post" onClick={footer.onClick}>
              +
            </p>
          </NewPostBtn>
        </IconBox>

        <IconBox onClick={footer.onClick}>
          {history.location.pathname === "/chat" ? (
            <ChatDotsFill />
          ) : (
            <ChatDots className="chat" />
          )}

          <p className="chat">채팅</p>
        </IconBox>

        <IconBox onClick={footer.onClick} className="profile">
          {LOGIN_USER_ID &&
          history.location.pathname === `/profile/${LOGIN_USER_ID.id}` ? (
            <PersonFill />
          ) : (
            <Person className="profile" />
          )}
          <p className="profile">프로필</p>
        </IconBox>
      </Wrapper>
    </>
  );
}

export default Footer;
