import {
  SET_USER_OBJ,
  SET_USER_TAB_INFO,
  SET_ACTIVE_TAB,
} from "../../actions/Profile";

const INITIAL_STATE = {
  userObj: {},
  activeTab: 0,
  userTabInfo: [],
  userLikeDealList: [],
};

export const userProfileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_OBJ:
      return {
        ...state,
        userObj: action.userObj,
      };
    case SET_USER_TAB_INFO:
      return {
        ...state,
        userTabInfo: action.userTabInfo,
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
