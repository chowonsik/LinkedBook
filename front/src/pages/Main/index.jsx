import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
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
import {
  setFilter,
  searchDeals,
  setSearch,
  resetDeals,
} from "../../actions/Deal/index.js";
import { requestGet } from "../../api";
import { setAreas } from "../../actions/Users";

export default function Main() {
  const search = useSelector((state) => state.dealReducer.search);
  const filter = useSelector((state) => state.dealReducer.filter);
  const searchDealList = useSelector(
    (state) => state.dealReducer.searchDealList[filter]
  );
  const [prevSearch, setPrevSearch] = useState("");
  const area = useSelector(
    (state) => state.userReducer.areas?.[state.userReducer.selectedAreaIndex]
  );

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) {
      history.push({ pathname: "/signin" });
    }
    setUserArea();
    if (location.state && location.state.reset) {
      dispatch(resetDeals());
    }
    if (searchDealList.length === 0) {
      handleSearchButtonClick();
    }
  }, []);

  function handleSearchChange(e) {
    dispatch(setSearch(e.target.value));
  }

  function handleSortButtonClick(filter) {
    dispatch(setFilter(filter));
  }

  function handleSearchButtonClick() {
    if (area) {
      setPrevSearch(search);
      dispatch(searchDeals(search, 0, area.areaId));
    }
  }

  function getListHeight() {
    return window.innerHeight - 120 - 140;
  }
  function getNextBook() {
    if (searchDealList.length % 10 != 0) return;
    const page = parseInt(searchDealList.length / 10);
    if (prevSearch === search) {
      dispatch(searchDeals(search, page, area.areaId));
    } else {
      dispatch(searchDeals(prevSearch, page, area.areaId));
    }
  }
  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight < scrollHeight) return;
    getNextBook();
  }

  async function setUserArea() {
    const response = await requestGet("/user-areas");
    dispatch(setAreas(response.result));
  }

  useEffect(() => {
    if (searchDealList.length === 0 && location.state && location.state.reset) {
      handleSearchButtonClick();
    }
  }, [searchDealList]);
  useEffect(() => {
    handleSearchButtonClick();
  }, [area]);

  return (
    <>
      <Header isLogo isSearch isAlarm />
      <Wrapper>
        <LocationContainer>
          <span
            className="location"
            onClick={() => {
              history.push({ pathname: "/location" });
            }}
          >
            {area ? area.areaDongmyeonri : ""}
          </span>
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
            placeholder="제목"
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
          {searchDealList.map((deal, i) => (
            <DealItem
              onClick={() => {
                history.push({ pathname: `/deal/${deal.dealId}` });
              }}
              key={i}
              dealObj={deal}
            />
          ))}
        </DealList>
      </Wrapper>

      <Footer />
    </>
  );
}
