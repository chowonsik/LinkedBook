import { SET_FOLLOWING_LIST, SET_FOLLOWER_LIST } from "../../actions/Follow";

const INIT_STATE = {
  followingList: [],
  followerList: [],
};

export const followReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_FOLLOWING_LIST:
      return {
        ...state,
        followingList: action.followings,
      };
    case SET_FOLLOWER_LIST:
      return {
        ...state,
        followerList: action.followers,
      };
    default:
      return state;
  }
};
