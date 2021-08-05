import React, { useState } from "react";
import Input from "../../../components/common/Input";
import Header from "../../../components/Layout/Header";
import useInput from "../../../hooks/useInput";

import { DongList, DongListItem, Wrapper } from "./style";

export default function LocationSearch() {
  const search = useInput("");
  const [location, setLocation] = useState({});

  return (
    <>
      <Header title="지역 검색" isBack />
      <Wrapper>
        <Input
          className="input"
          value={search.value}
          onChange={search.onChange}
          placeholder="(동, 읍, 면)으로 검색"
        />
      </Wrapper>
      <DongList>
        <DongListItem>대전 서구 월평1동</DongListItem>
        <DongListItem>대전 서구 월평1동</DongListItem>
        <DongListItem>대전 서구 월평1동</DongListItem>
        <DongListItem>대전 서구 월평1동</DongListItem>
        <DongListItem>대전 서구 월평1동</DongListItem>
      </DongList>
    </>
  );
}
