import {
  SET_LIKE_BOOK,
  SET_SOLD_BOOK,
  SET_BOUGHT_BOOK,
} from "../../actions/MyHistory";

const INITIAL_STATE = {
  likeBook: [],
};

export const myHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LIKE_BOOK:
      return {
        ...state,
        likeBook: action.likeBook,
      };
    case SET_SOLD_BOOK:
      return {
        ...state,
        soldBook: action.soldBook,
      };
    case SET_BOUGHT_BOOK:
      return {
        ...state,
        boughtBook: action.boughtBook,
      };
    default:
      return state;
  }
};
