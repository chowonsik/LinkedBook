import {
  SET_REPORT,
  SET_LIKE_COMMENTS,
  SET_LIKE_COMMENTS_PAGE,
} from "../../actions/Report";

const INIT_STATE = {
  status: 0,
  likeComments: [],
  currentPage: 0,
  totalPages: 0,
  totalElements: 0,
};

export const reportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_REPORT:
      return {
        ...state,
        status: action.status,
      };
    case SET_LIKE_COMMENTS:
      return {
        ...state,
        likeComments:
          action.currentPage === 0
            ? [...action.likeComments]
            : state.likeComments.concat([...action.likeComments]),
      };
    case SET_LIKE_COMMENTS_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        totalElements: action.totalElements,
      };
    default:
      return state;
  }
};
