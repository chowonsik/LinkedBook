import { requestGet } from "../../api";

export const SET_SEARCH_USER_RESULT = "SET_SEARCH_USER_RESULT";
export const SET_SEARCH_USER_RESET = "SET_SEARCH_USER_RESET";
export const getSearchUserResult = (params, page) => {
  return (dispatch) => {
    const response = requestGet("/users", params);
    response.then((res) => {
      const users = res.result;
      let isError = false;
      if (page === 0 && users.length === 0) {
        isError = true;
      }
      if (users.length) {
        dispatch(setSearchUserResult(users, isError));
      } else if (params.page > 0 && users.length === 0) {
        dispatch(setUserListReset());
      }
    });
  };
};

const setSearchUserResult = (users, isError) => {
  return {
    type: SET_SEARCH_USER_RESULT,
    users,
    isError,
  };
};

export const setUserListReset = () => {
  return {
    type: SET_SEARCH_USER_RESET,
    users: [],
  };
};
