import {
  SET_SEARCH_USER_RESULT,
  SET_SEARCH_USER_RESET,
  SET_PAGE_INFO,
  SET_SEARCH_ERROR,
} from "../../actions/Search";

const INIT_STATE = {
  userList: [],
  currentPage: 0,
  totalPages: 0,
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
      };
    case SET_SEARCH_USER_RESET:
      return {
        ...state,
        userList: action.users,
      };
    case SET_PAGE_INFO:
      return {
        ...state,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
      };
    case SET_SEARCH_ERROR:
      return {
        ...state,
        isError: action.isError,
      };
    default:
      return state;
  }
};
