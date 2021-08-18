import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SearchContainer from "../../components/Search";
import useSearchUser from "../../hooks/useSearchUser";
function SearchUser() {
  const search = useSearchUser();
  const [height, setHeight] = useState(0);
  const currentPage = useSelector((state) => state.searchReducer.currentPage);

  const innerHeignt = window.innerHeight;
  useEffect(() => {
    handleSetHeight();
  }, [innerHeignt]);

  function handleSetHeight() {
    const innerHeight = window.innerHeight;
    console.log(innerHeight - 175);
    setHeight(innerHeight - 175);
  }

  return (
    <>
      <Header isBack isLogo />
      <SearchContainer
        value={search.value}
        users={search.users}
        height={height}
        currentPage={currentPage}
        flag={search.flag}
        isActive={search.isActive}
        onKeyDown={search.handleKeyDown}
        onChange={search.handleChange}
        onKeyPress={search.handleKeyPress}
        onScroll={search.handleScroll}
        onClick={search.handleClickSearch}
      />
      <Footer />
    </>
  );
}

export default SearchUser;
