import React from "react";
import UserInfo from "../../components/Profile/UserInfo";
import UserActivity from "../../components/Profile/UserActivity";
import UserActivityTab from "../../components/Profile/UserActivityTab";
import UserDealItem from "../../components/Profile/UserDealItem";
import "./style.scss";
import { useState, useEffect } from "react";

function Profile() {
  const [userObj, setUserObject] = useState({});
  const [tabInfo, setTabInfo] = useState([]);
  useEffect(() => {
    // 정보받아옴
    setUserObject({
      nickname: "변대웅짱",
      image:
        "https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg",
      dongmyeonri: "덕명동",
      manner: 3.5,
      info: "Lorem ipsum dolor, sit amet consec tetur adipisicing elit. sit amet consectetur adip isici ng elit ",
      articles: 10,
      following: 10,
      follower: 11,
    });
    setTabInfo([
      {
        id: 12,
        img: "http://ccimg.hellomarket.com/images/2019/item/02/19/16/1121_3704470_1.jpg?size=s6",
        title: "어린왕자",
        price: 1000,
        author: "생텍쥐페리",
        publisher: "하이",
        deal_title: "쿨거래원함",
        like: 23,
        user_like: true,
        time: "몇시간전",
      },
      {
        id: 13,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6FgDQnQ7o_Fjbw6ABv9OvbTAGfzxZQEfOSQ&usqp=CAU",
        price: 1050,
        title: "어린왕자",
        author: "생텍쥐페리",
        publisher: "물구나무",
        deal_title: "네고가능",
        like: 23,
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
        like: 1,
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
        like: 4,
        user_like: false,
        time: "몇시간전",
      },
    ]);
  }, []);

  return (
    <div>
      <UserInfo userObj={userObj} />
      <UserActivity
        articles={userObj.articles}
        following={userObj.following}
        follower={userObj.follower}
      />
      {/*2) activitytab 에서 어떤게 클릭되었음을 쏴서 알려주고
      그거에 맞춰 api 요청을 보내고? 혹은 저장해서 다시 userdealitem 혹은 다른 컴포넌트
      보여주는 조건부 로직 짜기, 1)한줄평 보여주는 컴포넌트 만들기*/}
      <UserActivityTab />
      {tabInfo.map((article) => (
        <UserDealItem key={article.id} articleObj={article} />
      ))}
    </div>
  );
}

export default Profile;
