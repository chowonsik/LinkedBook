import { request, requestGet, KakaoBook } from "../../api.js";

export const SET_USER_COMMENTS = "SET_USER_COMMENTS";

export const getUserComments =
  (userId, page = 0) =>
  async (dispatch, getState) => {
    const params = {
      userId: userId,
      page: page,
      size: 10,
    };
    const { result } = await requestGet(`/comments`, params);
    console.log(result);
    if (page === 0) {
      dispatch(setUserComments(result));
    } else {
      const newUserComments = getState().commentReducer.comments.concat(result);
      dispatch(setUserComments(newUserComments));
    }
  };

export const setUserComments = (comments) => {
  return {
    type: SET_USER_COMMENTS,
    comments,
  };
};
