import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile, setUserProfile } from "../../actions/Users";

import UserInfo from "../../components/Profile/UserInfo";
import UserActivity from "../../components/Profile/UserActivity";
import DealItem from "../../components/DealItem";
import CommentItem from "../../components/CommentItem";
import ProfileTab from "../../components/Profile/ProfileTab";
import { Wrapper } from "./styles";
import { request } from "../../api";
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

const Profile = ({ match }) => {
  // 내프로필이면,useSelector로 가져오고(내프로필은 이미 app에서 요청해놓기)
  const userObjStore = useSelector((state) => state.userReducer.userProfile);
  const [userObj, setUserObj] = useState({});
  const [activeTab, setActiveTab] = useState("");
  const [tabInfo, setTabInfo] = useState([]);

  useEffect(() => {
    // current user가 자기자신인경우(자기자신 프로필, 임시로 2로 설정)
    if (parseInt(match.params.id) === 2) {
      setUserObj(userObjStore);
    } else {
      getUserObj(match.params.id);
    }
    setTabInfo([
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
    setActiveTab(0);
  }, [match.params.id]);

  const getUserObj = async (userId) => {
    const response = await request("get", `/users/${userId}/profile`, {
      headers: {
        "X-ACCESS-TOKEN": TOKEN,
      },
    });
    setUserObj(response.result);
  };

  const handleTabClick = (id) => {
    if (activeTab !== id) {
      setActiveTab(id);
      getTabInfo(id);
    }
  };

  const getTabInfo = async (activeTab) => {
    // 내거래인지, 관심거래인지, 한줄평인지에 따라 api 받아서
    if (activeTab === 0) {
      // setTabInfo
    } else if (activeTab === 1) {
      //api 요청
    } else {
      //api 요청
    }
  };
  return (
    <Wrapper>
      {userObj && (
        <>
          <UserInfo userObj={userObj} />
          <UserActivity
            dealCnt={userObj.dealCnt}
            followingCnt={userObj.followerCnt}
            followerCnt={userObj.followerCnt}
          />
          <ProfileTab handleTabClick={handleTabClick} activeTab={activeTab} />
          {activeTab !== 2
            ? tabInfo.map((deal) => <DealItem key={deal.id} dealObj={deal} />)
            : tabInfo.map((comment) => (
                <CommentItem key={comment.id} commentObj={comment} />
              ))}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
