import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Input from "../../../components/common/Input";
import Header from "../../../components/Layout/Header";
import { requestGet } from "../../../api.js";
import { DongList, DongListItem, Wrapper } from "./style";
import { useDispatch } from "react-redux";
import { addArea } from "../../../actions/Users";

export default function LocationSearch() {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  async function fetchData(page = 0) {
    const params = {
      search: search,
      size: 20,
      page: page,
    };
    const response = await requestGet("/areas", params);
    page === 0
      ? setSearchList(response.result)
      : setSearchList(searchList.concat(response.result));
  }

  function getListHeight() {
    const height = `${window.innerHeight - 60 - 130}px`;
    return height;
  }

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight < scrollHeight) return;
    if (searchList.length % 10 !== 0) return;
    const page = parseInt(searchList.length / 10);
    fetchData(page);
  }

  function handleAreaClick(selectedArea) {
    if (location.state) {
      if (location.state.isSignUp) {
        history.push({ pathname: "/signup", state: { area: selectedArea } });
      }
      if (location.state.isAreaAdd) {
        dispatch(addArea(selectedArea));
        history.goBack();
      }
    }
  }
  useEffect(() => {
    if (search !== "") fetchData();
    else setSearchList([]);
  }, [search]);

  return (
    <>
      <Header title="지역 검색" isBack />
      <Wrapper>
        <Input
          value={search}
          onChange={handleSearchChange}
          placeholder="(동, 읍, 면)으로 검색"
        />
      </Wrapper>
      <DongList height={getListHeight()} onScroll={handleScroll}>
        {searchList.map((area, i) => (
          <DongListItem
            onClick={() => {
              handleAreaClick(area);
            }}
            key={i}
          >
            {area.areaFullName}
          </DongListItem>
        ))}
      </DongList>
    </>
  );
}
