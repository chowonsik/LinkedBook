import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Header from "../../../components/Layout/Header";
import RecommendUserList from "../../../components/user/recommend/RecommendUserList";

import { Wrapper } from "./style";
import { request, requestGet } from "../../../api.js";

export default function RecommendUser() {
  const [userList, setUserList] = useState([]);
  const [dong, setDong] = useState("");
  const history = useHistory();

  function follow(userId) {
    const newUserList = userList.map((user) => {
      return user.userId === userId ? { ...user, isFollowing: true } : user;
    });
    setUserList(newUserList);
  }
  function unFollow(userId) {
    const newUserList = userList.map((user) => {
      return user.userId === userId ? { ...user, isFollowing: false } : user;
    });
    setUserList(newUserList);
  }

  async function requestFollow() {
    const loginUserId = JSON.parse(localStorage.getItem("loginUser")).id;
    for (const user of userList) {
      if (user.isFollowing) {
        await request("POST", "/follow", {
          fromUserId: loginUserId,
          toUserId: user.userId,
        });
      }
    }
  }

  function handlePassButtonClick() {
    localStorage.setItem("needRecommend", "false");
    requestFollow();
    history.push({ pathname: "/" });
  }

  async function fetchData() {
    const areas = await requestGet("/user-areas");
    const areaId = areas.result[0].areaId;
    setDong(areas.result[0].areaDongmyeonri);
    const params = {
      type: "STAR",
      areaId: areaId,
      page: 0,
      size: 10,
    };
    const response = await requestGet("/users", params);
    if (response.result.length === 0) {
      history.push("/");
    }
    setUserList(
      response.result.map((user) => ({ ...user, isFollowing: false }))
    );
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header title="책방 추천" />
      <Wrapper>
        <h1>Book Star</h1>
        <h2>{dong}의 인기 책방을 팔로우 해보세요</h2>
        <RecommendUserList
          userList={userList}
          follow={follow}
          unFollow={unFollow}
        />
      </Wrapper>
      <FooterButton value="건너뛰기" onClick={handlePassButtonClick} />
    </>
  );
}
