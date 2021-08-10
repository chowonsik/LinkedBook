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
          value="봉명동"
        />
      </Wrapper>
      <DongList>
        <DongListItem>대전 유성구 봉명동</DongListItem>
        <DongListItem>청주시 흥덕구 봉명동</DongListItem>
        <DongListItem>천안시 동남구 봉명동</DongListItem>
      </DongList>
    </>
  );
}
