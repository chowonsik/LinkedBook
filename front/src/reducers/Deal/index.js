import {
  RESET_DEALS,
  SET_DEALS,
  SET_FILTER,
  SET_IS_LOADING,
  SET_SEARCH,
  SET_SELECTED_DEALS,
} from "../../actions/Deal";

const INIT_STATE = {
  search: "",
  filter: "NEW",
  deals: {
    NEW: [],
    PRICE: [],
    QUALITY: [],
  },
  selectedDeals: [],
  isLoading: false,
};

export const dealReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    case SET_DEALS:
      return {
        ...state,
        deals: action.deals,
      };
    case SET_SELECTED_DEALS:
      return {
        ...state,
        selectedDeals: action.selectedDeals,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.loading,
      };
    case RESET_DEALS:
      return {
        ...state,
        filter: "NEW",
        deals: {
          NEW: [],
          PRICE: [],
          QUALITY: [],
        },
        selectedDeals: [],
        isLoading: false,
      };
    default:
      return state;
  }
};
