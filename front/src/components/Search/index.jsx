import { Search } from "react-bootstrap-icons";
import SearchResult from "./SearchResult";
import {
  Wrapper,
  SearchBar,
  Input,
  Icon,
  ResultContainer,
  ErrorMessage,
} from "./styles";

function SearchContainer({
  value,
  users,
  isActive,
  isError,
  onKeyDown,
  onChange,
  onKeyPress,
  onScroll,
}) {
  return (
    <Wrapper isActive={isActive}>
      <SearchBar>
        <Input
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          placeholder={`검색`}
        />
        <Icon>
          <Search />
        </Icon>
      </SearchBar>
      <ResultContainer onScroll={onScroll}>
        {users &&
          users.map((user) => (
            <SearchResult
              nickname={user.nickname}
              image={
                "https://drive.google.com/uc?id=1tf7W-Kb9p7eAfRbPx1fVCRrpPvyJSueR"
              }
              key={user.userId}
              userId={user.userId}
            />
          ))}
        <ErrorMessage isError={isError}>{"검색 결과가 없습니다."}</ErrorMessage>
      </ResultContainer>
    </Wrapper>
  );
}

export default SearchContainer;
