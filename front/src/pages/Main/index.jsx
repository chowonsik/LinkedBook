import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
  searchDeals,
  setSearch,
  resetDeals,
  setSelectDeals,
  addLikeDeal,
  deleteLikeDeal,
  setScroll,
  doRefresh,
} from "../../actions/Deal/index.js";
import { fetchAreas } from "../../actions/Users";

export default function Main() {
  const search = useSelector((state) => state.dealReducer.search);
  const filter = useSelector((state) => state.dealReducer.filter);
  const selectedDeals = useSelector((state) => state.dealReducer.selectedDeals);
  const area = useSelector((state) => state.userReducer.selectedArea);
  const isLoading = useSelector((state) => state.dealReducer.isLoading);
  const needRefresh = useSelector((state) => state.dealReducer.needRefresh);
  const scroll = useSelector((state) => state.dealReducer.scroll);

  const dealListRef = useRef(null);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) {
      history.push({ pathname: "/signin" });
    } else {
      setUserArea();
      // 거래 등록 후
      // if (location.state && location.state.reset) {
      //   dispatch(resetDeals());
      // }
      // if (selectedDeals) {
      //   if (selectedDeals.length === 0) {
      //     handleSearchButtonClick();
      //   }
      // }
    }
  }, []);

  useEffect(() => {
    if (needRefresh) {
      handleSearchButtonClick();
    } else {
      setDealListScroll();
      dispatch(doRefresh());
    }
  }, [area]);

  function setDealListScroll() {
    dealListRef.current.scrollTo(0, scroll);
  }

  function handleSearchButtonClick() {
    if (area) {
      dispatch(resetDeals());
      dispatch(searchDeals(search, 0, area.areaId));
    }
  }

  function handleSearchChange(e) {
    dispatch(setSearch(e.target.value));
  }

  function handleSortButtonClick(filter) {
    dispatch(setSelectDeals(filter));
  }

  function getListHeight() {
    return window.innerHeight - 120 - 140;
  }

  function getNextBook() {
    if (selectedDeals && selectedDeals.length % 10 != 0) return;
    const page = parseInt(selectedDeals.length / 10);
    dispatch(searchDeals(search, page, area.areaId));
  }
  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (isLoading) return;
    dispatch(setScroll(scrollTop));
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    getNextBook();
  }

  function setUserArea() {
    dispatch(fetchAreas());
  }

  function addLike(dealId, e) {
    dispatch(addLikeDeal(dealId));
    e.stopPropagation();
  }
  function deleteLike(dealId, e) {
    dispatch(deleteLikeDeal(dealId));
    e.stopPropagation();
  }

  function getDealItemWidth() {
    const width = `${window.innerWidth - 40}px`;
    return width;
  }

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
        <DealList
          height={getListHeight()}
          onScroll={handleScroll}
          ref={dealListRef}
        >
          {selectedDeals
            ? selectedDeals.map((deal, i) => (
                <DealItem
                  onClick={() => {
                    history.push({ pathname: `/deal/${deal.dealId}` });
                  }}
                  key={i}
                  dealObj={deal}
                  addLikeDeal={addLike}
                  deleteLikeDeal={deleteLike}
                  width={getDealItemWidth()}
                />
              ))
            : ""}
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
