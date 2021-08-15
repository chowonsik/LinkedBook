import { request, requestGet } from "../../api";

// 유저프로필
export const SET_MY_PROFILE = "SET_MY_PROFILE";
export const SET_MY_TAB_INFO = "SET_MY_TAB_INFO";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const getMyProfile = (userId) => {
  return async (dispatch) => {
    const response = await requestGet(`/users/${userId}/profile`);
    dispatch(setMyProfile(response.result));
  };
};

export const updateMyProfile = (data) => {
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;
  return async (dispatch) => {
    await request("patch", `/users`, data);
    dispatch(getMyProfile(LOGIN_USER_ID));
  };
};

export const getMyTabInfo = (activeTabId) => {
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;
  return async (dispatch) => {
    if (activeTabId === 0) {
      const params = {
        filter: "NEW",
        userId: LOGIN_USER_ID,
        size: 10,
        page: 0,
      };
      const { result } = await requestGet(`/deals`, params);
      await dispatch(setMyTabInfo(result));
    } else {
      const params = {
        userId: LOGIN_USER_ID,
        size: 10,
        page: 0,
      };
      const { result } = await requestGet(`/like-deals`, params);
      await dispatch(setMyTabInfo(result));
    }
  };
};

// 액션생성 함수 만들기
export const setMyProfile = (userObj) => {
  return {
    type: SET_MY_PROFILE,
    userObj,
  };
};
export const setMyTabInfo = (myTabInfo) => {
  return {
    type: SET_MY_TAB_INFO,
    myTabInfo,
  };
};

export const setActiveTab = (activeTab) => {
  return {
    type: SET_ACTIVE_TAB,
    activeTab,
  };
};
