import { request, requestGet, requestDelete } from "../../api";
import { createAlarm } from "../Alarm";
export const SET_FOLLOWING_LIST = "SET_FOLLOWING_LIST";
export const SET_FOLLOWER_LIST = "SET_FOLLOWER_LIST";
export const SET_FOLLOW_PAGE_INFO = "SET_FOLLOW_PAGE_INFO";
export const SET_FOLLOW_RESET = "SET_FOLLOW_RESET";
export const SET_LOGIN_USER_INFO = "SET_LOGIN_USER_INFO";
export const UPDATE_FOLLOWING_LIST = "UPDATE_FOLLOWING_LIST";
// 팔로잉 리스트 불러오기
export const getFollowingList = (params) => {
  return (dispatch) => {
    const response = requestGet("/follow/following", params);
    response.then((res) => {
      const currentPage = res.page.currentPage;
      const totalPages = res.page.totalPages;
      const totalElements = res.page.totalElements;
      dispatch(setFollowPageInfo(currentPage, totalPages, totalElements));
      dispatch(setFollowingList(res.result, currentPage));
    });
  };
};

export const setFollowingList = (followings, currentPage) => {
  return {
    type: SET_FOLLOWING_LIST,
    followings,
    currentPage,
  };
};

// 팔로잉 -> 팔로우
export const deleteFollowing = (followingId) => {
  return (dispatch) => {
    const response = requestDelete(`/follow/${followingId}`);
    response.then((res) => {
      dispatch(updateFollowingList(followingId));
    });
  };
};

export const updateFollowingList = (followId) => {
  return {
    type: UPDATE_FOLLOWING_LIST,
    followId,
  };
};
export const createFollow = (data) => {
  return (dispatch) => {
    const response = request("post", "/follow", data);
    dispatch(createFollowAlarm(data.toUserId));
  };
};
// 팔로워 리스트 불러오기
export const getFollowerList = (params) => {
  return (dispatch) => {
    const response = requestGet(`/follow/follower`, params);
    response.then((res) => {
      const currentPage = res.page.currentPage;
      const totalPages = res.page.totalPages;
      const totalElements = res.page.totalElements;
      dispatch(setFollowPageInfo(currentPage, totalPages, totalElements));
      dispatch(setFollowerList(res.result, currentPage));
    });
  };
};

export const setFollowerList = (followers, currentPage) => {
  return {
    type: SET_FOLLOWER_LIST,
    followers,
    currentPage,
  };
};

export const setFollowPageInfo = (currentPage, totalPages, totalElements) => {
  return {
    type: SET_FOLLOW_PAGE_INFO,
    currentPage,
    totalPages,
    totalElements,
  };
};

export const setFollowReset = () => {
  return {
    type: SET_FOLLOW_RESET,
  };
};

export const setLoginUserInfo = () => {
  return {
    type: SET_LOGIN_USER_INFO,
  };
};

export const createFollowAlarm = (userId) => {
  const params = {
    page: 0,
    size: 10,
  };
  return (dispatch) => {
    const response = requestGet("/follow/following", params);
    response.then((res) => {
      const followId = res.result.filter((data) => data.user.id === userId);
      if (followId.length !== 0) {
        const data = {
          type: "FOLLOW",
          followId: followId[0].follow.id,
        };
        dispatch(createAlarm(data));
      }
    });
  };
};
