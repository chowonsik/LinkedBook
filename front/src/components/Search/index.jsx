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
  height,
  currentPage,
  isActive,
  flag,
  onKeyDown,
  onChange,
  onKeyPress,
  onScroll,
  onClick,
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
        <Icon onClick={onClick}>
          <Search />
        </Icon>
      </SearchBar>
      <ResultContainer onScroll={onScroll} height={height}>
        {users &&
          users.map((user) => (
            <SearchResult
              nickname={user.nickname}
              image={user.image}
              key={user.userId}
              userId={user.userId}
            />
          ))}

        <ErrorMessage currentPage={currentPage} users={users} flag={flag}>
          {"검색 결과가 없습니다."}
        </ErrorMessage>
      </ResultContainer>
    </Wrapper>
  );
}

export default SearchContainer;
