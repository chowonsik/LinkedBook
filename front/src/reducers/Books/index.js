import {
  SET_BOOKLIST,
  SET_QUERY,
  DO_NOT_REFRESH,
  DO_REFRESH,
  SET_SCROLL,
  SET_LIKE_BOOKS,
  SET_LIKE_PAGE,
} from "../../actions/Books";

const INIT_STATE = {
  query: "",
  bookList: [],
  needRefresh: true,
  scroll: 0,
  likeBooks: [],
  likeCurrentPage: 0,
  likeTotalPages: 0,
  likeTotalElements: 0,
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
    case SET_LIKE_BOOKS:
      return {
        ...state,
        likeBooks:
          action.currentPage === 0
            ? [...action.books]
            : state.likeBooks.concat([...action.books]),
      };
    case SET_LIKE_PAGE:
      return {
        ...state,
        likeCurrentPage: action.currentPage,
        likeTotalPages: action.totalPages,
        likeTotalElements: action.totalElements,
      };
    default:
      return state;
  }
};
