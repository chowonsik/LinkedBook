import { requestGet } from "../../api";

export const SET_SEARCH_USER_RESULT = "SET_SEARCH_USER_RESULT";
export const SET_SEARCH_USER_RESET = "SET_SEARCH_USER_RESET";
export const SET_PAGE_INFO = "SET_CURRENT_PAGE";
export const SET_SEARCH_ERROR = "SET_SEARCH_ERROR";

export const getSearchUserResult = (params) => {
  return (dispatch) => {
    const response = requestGet("/users", params);
    response.then((res) => {
      const currentPage = res.page.currentPage;
      const totalPages = res.page.totalPages;

      dispatch(setPageInfo(currentPage, totalPages));
      const users = res.result;
      if (users) {
        dispatch(setSearchUserResult(users));
      } else {
        if (currentPage === 0) dispatch(setSearchError(true));
        else dispatch(setSearchError(false));
      }
    });
  };
};

const setSearchUserResult = (users) => {
  return {
    type: SET_SEARCH_USER_RESULT,
    users,
  };
};

export const setUserListReset = () => {
  return {
    type: SET_SEARCH_USER_RESET,
    users: [],
  };
};

export const setPageInfo = (currentPage, totalPages) => {
  return {
    type: SET_PAGE_INFO,
    currentPage,
    totalPages,
  };
};

export const setSearchError = (isError) => {
  return {
    type: SET_SEARCH_ERROR,
    isError,
  };
};
