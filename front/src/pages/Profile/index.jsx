import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMyProfile,
  getMyTabInfo,
  setActiveTab,
} from "../../actions/MyProfile";

import UserInfo from "../../components/Profile/UserInfo";
import UserActivity from "../../components/Profile/UserActivity";
import DealItem from "../../components/DealItem";
import ProfileTab from "../../components/Profile/ProfileTab";
import { Wrapper, DealList } from "./styles";
import { request, requestGet } from "../../api";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;
  const USER_ID = parseInt(match.params.id);
  const myUserObj = useSelector((state) => state.myProfileReducer.myProfile);
  const myTabInfo = useSelector((state) => state.myProfileReducer.myTabInfo);
  const activeTab = useSelector((state) => state.myProfileReducer.activeTab);

  const [userObj, setUserObj] = useState({});
  const [tabInfo, setTabInfo] = useState([]);
  const [listHeight, setListHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (USER_ID === LOGIN_USER_ID) {
      dispatch(getMyProfile(LOGIN_USER_ID));
      dispatch(getMyTabInfo(activeTab));
      setUserObj(myUserObj);
    } else {
      getUserObj(USER_ID);
    }
  }, [USER_ID]);

  useEffect(() => {
    setTabInfo(myTabInfo);
  }, [myTabInfo]);

  const getUserObj = async (userId) => {
    const response = await request("get", `/users/${userId}/profile`);
    setUserObj(response.result);
  };

  const handleTabClick = async (activeTabId) => {
    if (USER_ID === LOGIN_USER_ID) {
      await dispatch(getMyTabInfo(activeTabId));
      setTabInfo(myTabInfo);
    } else {
      getTabInfo(activeTabId);
    }
    dispatch(setActiveTab(activeTabId));
  };

  const getTabInfo = async (activeTabId, page = 0, label = "new") => {
    if (activeTabId === 0) {
      const params = {
        filter: "NEW",
        userId: USER_ID,
        size: 10,
        page: page,
      };
      const { result } = await requestGet(`/deals`, params);
      if (label === "new") {
        setTabInfo(result);
      } else {
        const newTabInfo = tabInfo.concat(result);
        setTabInfo(newTabInfo);
      }
    } else {
      const params = {
        userId: USER_ID,
        size: 10,
        page: page,
      };
      const { result } = await requestGet(`/like-deals`, params);
      if (label === "new") {
        setTabInfo(result);
      } else {
        const newTabInfo = tabInfo.concat(result);
        setTabInfo(newTabInfo);
      }
    }
  };

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    getNextBook();
  }

  function getNextBook() {
    if (tabInfo && tabInfo.length % 10 !== 0) return;
    const page = parseInt(tabInfo.length / 10);
    if (USER_ID === LOGIN_USER_ID) {
      dispatch(getMyTabInfo(activeTab, page, "next"));
    } else {
      getTabInfo(activeTab, page, "next");
    }
  }

  return (
    <>
      <Header isLogo isSearch isAlarm />
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
            <DealList height={listHeight} onScroll={handleScroll}>
              {tabInfo &&
                tabInfo.map((deal) => (
                  <DealItem key={deal.dealId} dealObj={deal} />
                ))}
            </DealList>
          </>
        )}
      </Wrapper>
      <Footer />
    </>
  );
};

export default Profile;
