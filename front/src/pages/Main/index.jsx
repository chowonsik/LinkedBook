import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import DealItem from "../../components/deal/DealListItem";
import {
  InputContainer,
  LocationContainer,
  SortByList,
  Wrapper,
  SortButton,
  DealList,
} from "./style";
import Input from "../../components/common/Input";
import { ChevronDown } from "react-bootstrap-icons";
import { fonts } from "../../styles";
import RoundButton from "../../components/common/Buttons/RoundButton";
import { setFilter, searchDeals, setSearch } from "../../actions/Deal/index.js";

export default function Main() {
  const search = useSelector((state) => state.dealReducer.search);
  const filter = useSelector((state) => state.dealReducer.filter);
  const searchDealList = useSelector(
    (state) => state.dealReducer.searchDealList[filter]
  );
  const [prevSearch, setPrevSearch] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  function handleSearchChange(e) {
    dispatch(setSearch(e.target.value));
  }

  function handleSortButtonClick(filter) {
    dispatch(setFilter(filter));
  }

  function handleSearchButtonClick() {
    setPrevSearch(search);
    dispatch(searchDeals(search));
  }

  function getListHeight() {
    return window.innerHeight - 120 - 140;
  }
  function getNextBook() {
    if (searchDealList.length % 10 != 0) return;
    const page = parseInt(searchDealList.length / 10);
    console.log(prevSearch);
    console.log(search);
    if (prevSearch === search) {
      dispatch(searchDeals(search, page));
    } else {
      dispatch(searchDeals(prevSearch, page));
    }
  }
  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight < scrollHeight) return;
    getNextBook();
  }
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) {
      history.push({ pathname: "/signin" });
    }
    if (searchDealList.length === 0) {
      handleSearchButtonClick();
    }
  }, []);

  return (
    <>
      <Header isLogo isSearch isAlarm />
      <Wrapper>
        <LocationContainer>
          <span className="location">덕명동</span>
          <span
            className="icon"
            onClick={() => {
              history.push({ pathname: "/location" });
            }}
          >
            <ChevronDown />
          </span>
        </LocationContainer>
        <InputContainer>
          <Input
            placeholder="책이름"
            value={search}
            onChange={handleSearchChange}
          />
          <RoundButton
            value="검색"
            width="60px"
            height="45px"
            fontSize={fonts.lg}
            onClick={handleSearchButtonClick}
          />
        </InputContainer>
        <SortByList>
          <SortButton
            selected={filter === "NEW" ? true : false}
            onClick={() => handleSortButtonClick("NEW")}
          >
            최신
          </SortButton>
          <SortButton
            selected={filter === "PRICE" ? true : false}
            onClick={() => handleSortButtonClick("PRICE")}
          >
            낮은 가격
          </SortButton>
          <SortButton
            selected={filter === "QUALITY" ? true : false}
            onClick={() => handleSortButtonClick("QUALITY")}
          >
            상태
          </SortButton>
        </SortByList>
        <DealList height={getListHeight()} onScroll={handleScroll}>
          {searchDealList.map((deal) => (
            <DealItem
              onClick={() => {
                history.push({ pathname: `/deal/${deal.dealId}` });
              }}
              key={deal.dealId}
              dealObj={deal}
            />
          ))}
        </DealList>
      </Wrapper>

      <Footer />
    </>
  );
}
