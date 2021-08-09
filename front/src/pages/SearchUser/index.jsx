import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SearchContainer from "../../components/Search";
import useSearchUser from "../../hooks/useSearchUser";
function SearchUser() {
  const search = useSearchUser();
  return (
    <>
      <Header isBack={true} isLogo={true} />
      <SearchContainer
        value={search.value}
        users={search.users}
        isActive={search.isActive}
        onKeyDown={search.handleKeyDown}
        onChange={search.handleChange}
        onKeyPress={search.handleKeyPress}
        onScroll={search.handleScroll}
      />
      <Footer />
    </>
  );
}

export default SearchUser;
