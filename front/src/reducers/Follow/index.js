import {
  SET_FOLLOWING_LIST,
  SET_FOLLOWER_LIST,
  SET_FOLLOW_PAGE_INFO,
  SET_FOLLOW_RESET,
  SET_LOGIN_USER_INFO,
} from "../../actions/Follow";

const INIT_STATE = {
  followingList: [],
  followerList: [],
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
  loginUser: window.localStorage.getItem("loginUser"),
};

export const followReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_FOLLOWING_LIST:
      return {
        ...state,
        followingList:
          action.currentPage === 0
            ? [...action.followings]
            : [...state.followingList, ...action.followings],
      };
    case SET_FOLLOWER_LIST:
      return {
        ...state,
        followerList:
          action.currentPage === 0
            ? [...action.followers]
            : [...state.followerList, ...action.followers],
      };
    case SET_FOLLOW_PAGE_INFO:
      return {
        ...state,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        totalElements: action.totalElements,
      };
    case SET_FOLLOW_RESET:
      return {
        ...state,
        followerList: [],
        followingList: [],
      };
    case SET_LOGIN_USER_INFO:
      return {
        ...state,
        loginUser: JSON.parse(window.localStorage.getItem("loginUser")),
      };
    default:
      return state;
  }
};
