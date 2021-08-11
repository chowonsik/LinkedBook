import { requestGet } from "../../api.js";

export const SET_SEARCH = "SET_SEARCH";
export const SET_FILTER = "SET_FILTER";
export const SEARCH_DEALS = "SEARCH_DEALS";
export const RESET_DEALS = "RESET_DEALS";
export const SET_DEALS = "SET_DEALS";

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    value: search,
  };
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    value: filter,
  };
};

export const searchDeals =
  (search = "", page = 0, areaId = 1) =>
  async (dispatch, getState) => {
    const data = {
      search: search,
      filter: "NEW",
      size: 10,
      page: page,
      areaId: areaId,
    };
    try {
      const NEW = await requestGet("/deals", data);
      data.filter = "PRICE";
      const PRICE = await requestGet("/deals", data);
      data.filter = "QUALITY";
      const QUALITY = await requestGet("/deals", data);
      const newNEW = getState().dealReducer.searchDealList.NEW.concat(
        NEW.result
      );
      const newPRICE = getState().dealReducer.searchDealList.PRICE.concat(
        PRICE.result
      );
      const newQUALITY = getState().dealReducer.searchDealList.QUALITY.concat(
        QUALITY.result
      );

      dispatch(
        setDeals({
          NEW: page === 0 ? NEW.result : newNEW,
          PRICE: page === 0 ? PRICE.result : newPRICE,
          QUALITY: page === 0 ? QUALITY.result : newQUALITY,
        })
      );
    } catch (e) {
      alert("검색 실패");
    }
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
