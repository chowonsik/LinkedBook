import { requestGet } from "../../api.js";

export const SET_SEARCH = "SET_SEARCH";
export const SET_FILTER = "SET_FILTER";
export const SET_SELECT_DEALS = "SET_SELECT_DEALS";
export const SET_SELECTED_DEALS = "SET_SELECTED_DEALS";
export const SEARCH_DEALS = "SEARCH_DEALS";
export const RESET_DEALS = "RESET_DEALS";
export const SET_DEALS = "SET_DEALS";
export const SET_IS_LOADING = "SET_IS_LOADING";

export const setIsLoading = (loading) => {
  return {
    type: SET_IS_LOADING,
    loading: loading,
  };
};

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    search: search,
  };
};

export const setSelectDeals = (filter) => (dispatch, getState) => {
  dispatch(setFilter(filter));
  dispatch(setSelectedDeals(getState().dealReducer.deals[filter]));
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    filter: filter,
  };
};

export const setSelectedDeals = (selectedDeals) => {
  return {
    type: SET_SELECTED_DEALS,
    selectedDeals: selectedDeals,
  };
};

export const searchDeals =
  (search = "", page = 0, areaId = 1) =>
  async (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const data = {
      search: search,
      filter: "NEW",
      size: 10,
      page: page,
      areaId: areaId,
    };
    const NEW = await requestGet("/deals", data);
    data.filter = "PRICE";
    const PRICE = await requestGet("/deals", data);
    data.filter = "QUALITY";
    const QUALITY = await requestGet("/deals", data);
    const newNEW = getState().dealReducer.deals.NEW.concat(NEW.result);
    const newPRICE = getState().dealReducer.deals.PRICE.concat(PRICE.result);
    const newQUALITY = getState().dealReducer.deals.QUALITY.concat(
      QUALITY.result
    );

    if (page === 0) {
      dispatch(
        setDeals({
          NEW: NEW.result,
          PRICE: PRICE.result,
          QUALITY: QUALITY.result,
        })
      );
      dispatch(setSelectDeals("NEW"));
    } else {
      dispatch(
        setDeals({
          NEW: newNEW,
          PRICE: newPRICE,
          QUALITY: newQUALITY,
        })
      );
      dispatch(setSelectDeals(getState().dealReducer.filter));
    }
    dispatch(setIsLoading(false));
  };

export const setDeals = (deals) => {
  return {
    type: SET_DEALS,
    deals: deals,
  };
};

export const resetDeals = () => {
  return {
    type: RESET_DEALS,
  };
};
