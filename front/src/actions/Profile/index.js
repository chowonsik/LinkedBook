import { request, requestGet } from "../../api";
import { showToast } from "../Notification";

// 유저프로필
export const SET_USER_OBJ = "SET_USER_OBJ";
export const SET_USER_TAB_INFO = "SET_USER_TAB_INFO";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const getUserObj = (userId) => async (dispatch) => {
  const response = await requestGet(`/users/${userId}/profile`);
  dispatch(setUserObj(response.result));
};

export const updateUserObj = (data) => async (dispatch) => {
  const LOGIN_USER_ID = JSON.parse(window.localStorage.getItem("loginUser")).id;
  const res = await request("patch", `/users`, data);
  if (res.status === 200) {
    dispatch(getUserObj(LOGIN_USER_ID));
    dispatch(showToast("프로필이 수정되었습니다."));
    return 200;
  } else {
    dispatch(showToast(res.message));
    return 400;
  }
};

export const getUserTabInfo =
  (userId, activeTabId, page = 0, label = "new") =>
  async (dispatch, getState) => {
    if (activeTabId === 0) {
      const params = {
        filter: "NEW",
        userId: userId,
        size: 10,
        page: page,
      };
      const { result } = await requestGet(`/deals`, params);
      if (label === "new") {
        await dispatch(setUserTabInfo(result));
      } else {
        const newTabInfo =
          getState().userProfileReducer.userTabInfo.concat(result);
        await dispatch(setUserTabInfo(newTabInfo));
      }
    } else {
      const params = {
        userId: userId,
        size: 10,
        page: page,
      };
      const { result } = await requestGet(`/like-deals`, params);
      if (label === "new") {
        await dispatch(setUserTabInfo(result));
      } else {
        const newTabInfo =
          getState().userProfileReducer.userTabInfo.concat(result);
        await dispatch(setUserTabInfo(newTabInfo));
      }
    }
  };

// 액션생성 함수 만들기
export const setUserObj = (userObj) => {
  return {
    type: SET_USER_OBJ,
    userObj,
  };
};
export const setUserTabInfo = (userTabInfo) => {
  return {
    type: SET_USER_TAB_INFO,
    userTabInfo,
  };
};

export const setActiveTab = (activeTab) => {
  return {
    type: SET_ACTIVE_TAB,
    activeTab,
  };
};
