import React, { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Header from "../../../components/Layout/Header";
import { requestGet } from "../../../api.js";
import { DongList, DongListItem, Wrapper } from "./style";

export default function LocationSearch() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState({});
  const [searchList, setSearchList] = useState([]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }
  async function fetchData(page = 0) {
    const params = {
      search: search,
      size: 10,
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
          value="봉명동"
        />
      </Wrapper>
      <DongList height={getListHeight()} onScroll={handleScroll}>
        {searchList.map((item, i) => (
          <DongListItem key={i}>{item.areaFullName}</DongListItem>
        ))}
      </DongList>
    </>
  );
}
