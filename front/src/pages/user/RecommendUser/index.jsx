import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FooterButton from "../../../components/common/Buttons/FooterButton";
import Header from "../../../components/Layout/Header";
import RecommendUserList from "../../../components/user/recommend/RecommendUserList";

import { Wrapper } from "./style";
import { requestGet } from "../../../api.js";

export default function RecommendUser() {
  const [userList, setUserList] = useState([]);
  const [dong, setDong] = useState("");
  const history = useHistory();
  function handlePassButtonClick() {
    localStorage.setItem("needRecommend", "false");
    history.push({ pathname: "/" });
  }

  async function addFollowings(bookStars) {
    const followings = await requestGet("/follow/following", {
      page: 0,
      size: 10,
    });
    console.log(followings);
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
    const result = await addFollowings(response.result);
    setUserList(response.result);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header title="책방 추천" isBack />
      <Wrapper>
        <h1>Book Star</h1>
        <h2>{dong}의 인기 책방을 팔로우 해보세요</h2>
        <RecommendUserList userList={userList} />
      </Wrapper>
      <FooterButton value="건너뛰기" onClick={handlePassButtonClick} />
    </>
  );
}
