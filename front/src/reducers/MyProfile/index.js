import {
  SET_MY_PROFILE,
  SET_MY_TAB_INFO,
  SET_ACTIVE_TAB,
} from "../../actions/MyProfile";

const INITIAL_STATE = {
  myProfile: {},
  activeTab: 0,
  myTabInfo: {},
  myLikeDealList: {},
};

export const myProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MY_PROFILE:
      return {
        ...state,
        myProfile: action.userObj,
      };
    case SET_MY_TAB_INFO:
      return {
        ...state,
        myTabInfo: action.myTabInfo,
      };
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.activeTab,
      };
    default:
      return state;
  }
};
