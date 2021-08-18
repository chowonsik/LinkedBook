import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserTabInfo,
  setActiveTab,
  getUserObj,
} from "../../actions/Profile";

import UserInfo from "../../components/Profile/UserInfo";
import UserActivity from "../../components/Profile/UserActivity";
import DealItem from "../../components/DealItem";
import ProfileTab from "../../components/Profile/ProfileTab";
import { Wrapper, DealList } from "./styles";
import { request, requestDelete } from "../../api";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import { createAlarm } from "../../actions/Alarm";

const Profile = ({ match }) => {
  const dispatch = useDispatch();
  const LOGIN_USER_ID = JSON.parse(
    window.localStorage.getItem("loginUser")
  )?.id;
  const USER_ID = parseInt(match.params.id);
  const userObj = useSelector((state) => state.userProfileReducer.userObj);
  const userTabInfo = useSelector(
    (state) => state.userProfileReducer.userTabInfo
  );
  const activeTab = useSelector((state) => state.userProfileReducer.activeTab);
  const [isFollow, setIsFollow] = useState(userObj?.isFollow);
  const [listHeight, setListHeight] = useState(window.innerHeight - 260);

  useEffect(() => {
    dispatch(getUserObj(USER_ID));
    dispatch(getUserTabInfo(USER_ID, activeTab));
  }, [USER_ID]);

  const handleTabClick = async (activeTabId) => {
    await dispatch(setActiveTab(activeTabId));
    await dispatch(getUserTabInfo(USER_ID, activeTabId));
  };

  async function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    if (userTabInfo && userTabInfo.length % 10 !== 0) return;
    const page = parseInt(userTabInfo.length / 10);
    await dispatch(getUserTabInfo(USER_ID, activeTab, page, "next"));
  }

  async function follow() {
    const data = {
      toUserId: USER_ID,
      fromUserId: LOGIN_USER_ID,
    };
    await request("post", "/follow", data);
    await dispatch(getUserObj(USER_ID));
    await dispatch(createAlarm({ type: "FOLLOW", followId: userObj.isFollow }));
  }

  async function unFollow() {
    await requestDelete(`/follow/${userObj.isFollow}`);
    dispatch(getUserObj(USER_ID));
  }

  function toggleFollowBtn() {
    if (userObj.isFollow) {
      setIsFollow(false);
      unFollow();
    } else {
      setIsFollow(true);
      follow();
    }
  }

  return (
    <>
      {LOGIN_USER_ID === USER_ID ? (
        <Header isLogo isSearch isAlarm />
      ) : (
        <Header isBack title="프로필" isSearch isAlarm />
      )}
      <Wrapper>
        {userObj && (
          <>
            <UserInfo
              userObj={userObj}
              isFollow={isFollow}
              toggleFollowBtn={toggleFollowBtn}
            />
            <UserActivity
              userId={USER_ID}
              dealCnt={userObj.dealCnt}
              followingCnt={userObj.followingCnt}
              followerCnt={userObj.followerCnt}
            />
            <ProfileTab handleTabClick={handleTabClick} activeTab={activeTab} />
            <DealList height={listHeight} onScroll={handleScroll}>
              {userTabInfo &&
                userTabInfo.map((deal, idx) => (
                  <DealItem key={idx} dealObj={deal} />
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
