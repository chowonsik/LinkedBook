import {
  SET_SEARCH_USER_RESULT,
  SET_SEARCH_USER_RESET,
} from "../../actions/Search";

const INIT_STATE = {
  userList: [],
  isError: false,
};

export const searchReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_USER_RESULT:
      return {
        ...state,
        userList: state.userList
          ? state.userList.concat(action.users)
          : [...action.users],
        isError: action.isError,
      };
    case SET_SEARCH_USER_RESET:
      return {
        ...state,
        userList: action.users,
      };
    default:
      return state;
  }
};
