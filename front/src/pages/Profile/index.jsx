import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile, getMyTabInfo } from "../../actions/MyProfile";

import UserInfo from "../../components/Profile/UserInfo";
import UserActivity from "../../components/Profile/UserActivity";
import DealItem from "../../components/DealItem";
import ProfileTab from "../../components/Profile/ProfileTab";
import { Wrapper } from "./styles";
import { request, requestGet } from "../../api";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;
  const myUserObj = useSelector((state) => state.myProfileReducer.myProfile);
  const myTabInfo = useSelector((state) => state.myProfileReducer.myTabInfo);
  const myActiveTab = useSelector((state) => state.myProfileReducer.activeTab);

  const [userObj, setUserObj] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [tabInfo, setTabInfo] = useState([]);
  const USER_ID = parseInt(match.params.id);

  useEffect(() => {
    if (USER_ID === LOGIN_USER_ID) {
      dispatch(getMyProfile(LOGIN_USER_ID));
      dispatch(getMyTabInfo(myActiveTab));
      setUserObj(myUserObj);
      setTabInfo(myTabInfo);
    } else {
      getUserObj(USER_ID);
      getTabInfo(activeTab);
    }
  }, [USER_ID]);

  const getUserObj = async (userId) => {
    const response = await request("get", `/users/${userId}/profile`);
    setUserObj(response.result);
  };

  const handleTabClick = async (activeTabId) => {
    setActiveTab(activeTabId);
    if (USER_ID === LOGIN_USER_ID) {
      dispatch(getMyTabInfo(activeTabId));
      setTabInfo(myTabInfo);
    } else {
      if (activeTabId === 0) {
        const params = {
          filter: "NEW",
          userId: USER_ID,
          size: 10,
          page: 0,
        };
        const { result } = await requestGet(`/deals`, params);
        setTabInfo(result);
      } else {
        setTabInfo([]);
        // 관심책 info 가져옴
      }
    }
  };

  const getTabInfo = async (activeTabId) => {
    if (activeTabId === 0) {
      const params = {
        filter: "NEW",
        userId: USER_ID,
        size: 10,
        page: 0,
      };
      const { result } = await requestGet(`/deals`, params);
      setTabInfo(result);
    } else {
      const params = {
        userId: USER_ID,
        size: 10,
        page: 0,
      };
      const { result } = await requestGet(`/like-deals`, params);
      // setTabInfo(result);
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
          {tabInfo &&
            tabInfo.map((deal) => (
              <DealItem key={deal.dealId} dealObj={deal} />
            ))}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
