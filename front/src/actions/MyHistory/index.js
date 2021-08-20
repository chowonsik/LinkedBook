import { requestGet } from "../../api";

// 유저프로필
export const SET_LIKE_BOOK = "SET_LIKE_BOOK";
export const SET_SOLD_BOOK = "SET_SOLD_BOOK";
export const SET_BOUGHT_BOOK = "SET_BOUGHT_BOOK";

export const getLikeBook =
  (userId, page = 0) =>
  async (dispatch, getState) => {
    const params = { userId: userId, page: page, size: 10 };
    const { result } = await requestGet(`/like-books`, params);

    if (page === 0) {
      dispatch(setLikeBook(result));
    } else {
      const newLikeBook = getState().myHistoryReducer.likeBook.concat(result);
      dispatch(setLikeBook(newLikeBook));
    }
  };

export const getSoldBook =
  (userId, page = 0) =>
  async (dispatch, getState) => {
    const params = { userId: userId, type: "SALE", page: 0, size: 10 };
    const { result } = await requestGet(`/user-deals`, params);
    if (page === 0) {
      dispatch(setSoldBook(result));
    } else {
      const newSoldBook = getState().myHistoryReducer.soldBook.concat(result);
      dispatch(setSoldBook(newSoldBook));
    }
  };

export const getBoughtBook =
  (userId, page = 0) =>
  async (dispatch, getState) => {
    const params = { userId: userId, type: "PURCHASE", page: 0, size: 10 };
    const { result } = await requestGet(`/user-deals`, params);
    if (page === 0) {
      dispatch(setBoughtBook(result));
    } else {
      const newBoughtBook =
        getState().myHistoryReducer.boughtBook.concat(result);
      dispatch(setBoughtBook(newBoughtBook));
    }
  };

export const setLikeBook = (likeBook) => {
  return {
    type: SET_LIKE_BOOK,
    likeBook,
  };
};

export const setSoldBook = (soldBook) => {
  return {
    type: SET_SOLD_BOOK,
    soldBook,
  };
};
export const setBoughtBook = (boughtBook) => {
  return {
    type: SET_BOUGHT_BOOK,
    boughtBook,
  };
};
