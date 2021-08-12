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
  Spinner,
  SpinnerContainer,
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
  setSelect,
} from "../../actions/Deal/index.js";
import { requestGet } from "../../api";
import { fetchAreas, setAreas } from "../../actions/Users";

export default function Main() {
  const search = useSelector((state) => state.dealReducer.search);
  const filter = useSelector((state) => state.dealReducer.filter);
  const selectedDeals = useSelector((state) => state.dealReducer.selectedDeals);
  const [prevSearch, setPrevSearch] = useState("");
  const area = useSelector((state) => state.userReducer.selectedArea);
  const isLoading = useSelector((state) => state.dealReducer.isLoading);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) {
      history.push({ pathname: "/signin" });
    }
    setUserArea();

    // 거래 등록 후
    if (location.state && location.state.reset) {
      dispatch(resetDeals());
    }
    //
    if (selectedDeals.length === 0) {
      handleSearchButtonClick();
    }
  }, []);

  function handleSearchButtonClick() {
    if (area) {
      dispatch(resetDeals());
      setPrevSearch(search);
      dispatch(searchDeals(search, 0, area.areaId));
    }
  }

  function handleSearchChange(e) {
    dispatch(setSearch(e.target.value));
  }

  function handleSortButtonClick(filter) {
    dispatch(setSelect(filter));
  }

  function getListHeight() {
    return window.innerHeight - 120 - 140;
  }

  function getNextBook() {
    if (selectedDeals.length % 10 != 0) return;
    const page = parseInt(selectedDeals.length / 10);
    if (prevSearch === search) {
      dispatch(searchDeals(search, page, area.areaId));
    } else {
      dispatch(searchDeals(prevSearch, page, area.areaId));
    }
  }
  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (isLoading) return;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    getNextBook();
  }

  function setUserArea() {
    dispatch(fetchAreas());
  }

  useEffect(() => {
    if (selectedDeals.length === 0 && location.state && location.state.reset) {
      handleSearchButtonClick();
    }
  }, [selectedDeals]);

  useEffect(() => {
    dispatch(resetDeals());
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
          {selectedDeals.map((deal, i) => (
            <DealItem
              onClick={() => {
                history.push({ pathname: `/deal/${deal.dealId}` });
              }}
              key={i}
              dealObj={deal}
            />
          ))}
          {isLoading ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : (
            ""
          )}
        </DealList>
      </Wrapper>

      <Footer />
    </>
  );
}
