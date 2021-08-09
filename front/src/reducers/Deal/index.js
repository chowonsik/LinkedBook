import {
  RESET_DEALS,
  SET_DEALS,
  SET_FILTER,
  SET_SEARCH,
} from "../../actions/Deal";

const INIT_STATE = {
  search: "",
  filter: "NEW",
  searchDealList: {
    NEW: [],
    PRICE: [],
    QUALITY: [],
  },
};

export const dealReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.value,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.value,
      };
    case SET_DEALS:
      return {
        ...state,
        searchDealList: action.deals,
      };
    case RESET_DEALS:
      return {
        ...state,
        searchDealList: {
          NEW: [],
          PRICE: [],
          QUALITY: [],
        },
      };
    default:
      return state;
  }
};
