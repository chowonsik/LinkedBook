import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import DealItem from "../../components/deal/DealItem";
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
  const [deals, setDeals] = useState([]);
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
    setDeals([
      {
        id: 12,
        img: "http://ccimg.hellomarket.com/images/2019/item/02/19/16/1121_3704470_1.jpg?size=s6",
        title: "넷플릭스 파워풀",
        price: 1000,
        quality: "상",
        author: "생텍쥐페리",
        publisher: "하이",
        deal_title: "넷플릭스 파워풀 거의 새상품",
        user_like: true,
        time: "20분 전",
      },
      {
        id: 13,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FgDQnQ7o_Fjbw6ABv9OvbTAGfzxZQEfOSQ&usqp=CAU",
        price: 1050,
        title: "어린왕자",
        author: "생텍쥐페리",
        publisher: "물구나무",
        deal_title: "네고가능",
        quality: "중",
        user_like: true,
        time: "몇시간전",
      },
      {
        id: 15,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FgDQnQ7o_Fjbw6ABv9OvbTAGfzxZQEfOSQ&usqp=CAU",
        price: 1000,
        title: "어린왕자",
        author: "생텍쥐페리",
        publisher: "하이",
        deal_title: "쿨거래원함",
        quality: "하",
        user_like: false,
        time: "몇시간전",
      },
      {
        id: 14,
        img: "https://img1.yna.co.kr/etc/inner/KR/2020/09/04/AKR20200904035600005_01_i_P2.jpg",
        price: 1000,
        title: "어린왕자",
        author: "생텍쥐페리",
        publisher: "하이",
        quality: "상",
        deal_title: "판매중",
        user_like: false,
        time: "몇시간전",
      },
    ]);
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
        <div className="deal-list">
          {deals.map((deal) => (
            <DealItem
              onClick={() => {
                history.push({ pathname: "/deal/1" });
              }}
              key={deal.id}
              dealObj={deal}
            />
          ))}
        </div>
      </Wrapper>

      <Footer />
    </>
  );
}
