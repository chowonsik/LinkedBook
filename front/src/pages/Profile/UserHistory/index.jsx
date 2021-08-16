import React from "react";
import { useEffect } from "react";
import { request, requestGet } from "../../../api";
import Header from "../../../components/Layout/Header";

function UserHistory({ location }) {
  const userId = location.state.userId;

  useEffect(() => {
    getLikeBook();
    getSoldBook();
    getBoughtBook();
  }, []);

  async function getLikeBook() {
    const params = { userId: userId, page: 0, size: 5 };
    const response = await requestGet(`/like-books`, params);
    console.log(response);
  }
  async function getSoldBook() {
    const params = { userId: userId, type: "SALE", page: 0, size: 5 };
    const response = await requestGet(`/user-deals`, params);
    console.log(response);
  }
  async function getBoughtBook() {
    const params = { userId: userId, type: "PURCHASE", page: 0, size: 5 };
    const response = await requestGet(`/user-deals`, params);
    console.log(response);
  }
  return (
    <>
      <Header isBack title="나의 활동" />
      <h1>관심 책</h1>
      <div></div>

      <h1>판매완료</h1>
      <h1>구매완료</h1>
      <button>나의 한줄평 보러가기</button>
      <div></div>
    </>
  );
}

export default UserHistory;
