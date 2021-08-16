import {
  SET_BOOKLIST,
  SET_QUERY,
  DO_NOT_REFRESH,
  DO_REFRESH,
  SET_SCROLL,
} from "../../actions/Books";

const INIT_STATE = {
  query: "",
  bookList: [],
  needRefresh: true,
  scroll: 0,
};

export const bookReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        query: action.query,
      };
    case SET_BOOKLIST:
      return {
        ...state,
        bookList: action.bookList,
      };
    case DO_NOT_REFRESH:
      return {
        ...state,
        needRefresh: false,
      };
    case DO_REFRESH:
      return {
        INIT_STATE,
      };
    case SET_SCROLL:
      return {
        ...state,
        scroll: action.scroll,
      };
    default:
      return state;
  }
};
