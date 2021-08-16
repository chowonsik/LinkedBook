import { request, requestGet, KakaoBook } from "../../api.js";
export const SET_QUERY = "SET_QUERY";
export const RESET_BOOKLIST = "RESET_BOOKLIST";
export const SET_BOOKLIST = "SET_BOOKLIST";
export const DO_NOT_REFRESH = "DO_NOT_REFRESH";
export const DO_REFRESH = "DO_REFRESH";
export const SET_SCROLL = "SET_SCROLL";

// export const getBooksData = (query = "", page = 1) => {
//   if (query.length === 0) return;
//   return (getState, dispatch) => {
//     const params = {
//       query: query,
//       sort: "accuracy",
//       page: page,
//       size: 10,
//     };
//     const { data } = KakaoBook(params);
//     if (page === 1) {
//       dispatch(setBookList(data.documents));
//     } else {
//       const newBookList = getState.bookReducer.bookList.concat(data.documents);
//       dispatch(setBookList(newBookList));
//     }
//   };
// };

export const setBookList = (bookList) => {
  return {
    type: SET_BOOKLIST,
    bookList,
  };
};

export const setQuery = (query) => {
  return {
    type: SET_QUERY,
    query,
  };
};

export const doNotRefresh = () => {
  return {
    type: DO_NOT_REFRESH,
  };
};

export const doRefresh = () => {
  return {
    type: DO_REFRESH,
  };
};

export const setScroll = (scroll) => {
  return {
    type: SET_SCROLL,
    scroll: scroll,
  };
};
