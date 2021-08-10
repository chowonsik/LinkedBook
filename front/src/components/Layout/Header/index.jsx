import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  BellFill,
  PatchExclamationFill,
} from "react-bootstrap-icons";

import {
  Wrapper,
  BackButton,
  LogoAndTitle,
  IconsAndDone,
  DoneButton,
  Block,
} from "./styles";

/*
  Header에 포함되어 있는 모든 요소에 대해 true, false 값을 전달받아
  true 값인 요소만 Header에 출력
*/

function Header({
  history,
  title = "",
  isLogo = false,
  isBack = false,
  isSearch = false,
  isAlarm = false,
  isDeclare = false,
  isDone = false,
  onClickSearch,
}) {
  function handleClickBack() {
    history.goBack();
  }
  return (
    <Block>
      <Wrapper>
        <BackButton isBack={isBack}>
          <ArrowLeft className="back-btn" onClick={handleClickBack} />
        </BackButton>

        <LogoAndTitle isLogo={isLogo} isTitle={title}>
          <Link to="/">
            <img
              src="assets/images/logo/main-logo.png"
              alt="Linked Book"
              className="logo"
            />
          </Link>
          <h3>{title}</h3>
        </LogoAndTitle>

        <IconsAndDone
          isSearch={isSearch}
          isAlarm={isAlarm}
          isDeclare={isDeclare}
          isDone={isDone}
        >
          <Link to="/search/user">
            <Search className="search-btn" onClick={onClickSearch} />
          </Link>
          <BellFill className="alarm-btn" />
          <PatchExclamationFill className="declare" />
          <DoneButton className="done-btn">완료</DoneButton>
        </IconsAndDone>
      </Wrapper>
    </Block>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  isLogo: PropTypes.bool,
  isBack: PropTypes.bool,
  isSearch: PropTypes.bool,
  isAlarm: PropTypes.bool,
  isDeclare: PropTypes.bool,
  isDone: PropTypes.bool,
};
export default withRouter(Header);
