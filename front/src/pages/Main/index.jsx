import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import {
  InputContainer,
  LocationContainer,
  SortByList,
  Wrapper,
  SortButton,
} from "./style";
import Input from "../../components/common/Input";
import { ChevronDown } from "react-bootstrap-icons";
import { fonts } from "../../styles";
import RoundButton from "../../components/common/Buttons/RoundButton";
import { useEffect } from "react";

export default function Main() {
  const [sortBy, setSortBy] = useState(0);
  const history = useHistory();
  function handleSortButtonClick(sort) {
    setSortBy(sort);
  }

  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (!loginUser) {
      history.push({ pathname: "/signin" });
    }
  }, []);

  return (
    <>
      <Header isLogo isSearch isAlarm />
      <Wrapper>
        <LocationContainer>
          <span className="location">덕명동</span>
          <span className="icon">
            <ChevronDown />
          </span>
        </LocationContainer>
        <InputContainer>
          <Input placeholder="책이름" />
          <RoundButton
            value="검색"
            width="60px"
            height="45px"
            fontSize={fonts.lg}
          />
        </InputContainer>
        <SortByList>
          <SortButton
            selected={sortBy === 0 ? true : false}
            onClick={() => handleSortButtonClick(0)}
          >
            최신
          </SortButton>
          <SortButton
            selected={sortBy === 1 ? true : false}
            onClick={() => handleSortButtonClick(1)}
          >
            낮은 가격
          </SortButton>
          <SortButton
            selected={sortBy === 2 ? true : false}
            onClick={() => handleSortButtonClick(2)}
          >
            상태
          </SortButton>
        </SortByList>
      </Wrapper>
      <Wrapper>
        <div>메인화면</div>
        <div>
          <Link to="/signin">로그인 </Link>
          <Link to="/signup">회원가입 </Link>
          <Link to="/search/location">지역 검색 </Link>
          <Link to="/recommend">회원 추천</Link>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
}
