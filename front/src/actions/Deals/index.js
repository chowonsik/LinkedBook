import { request } from "../../api";
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

// 액션 타입 만들기
export const SET_USER_DEALS = "SET_USER_DEALS";
export const SET_LIKE_DEALS = "SET_LIKE_DEALS";

export const getUserDeals = (userId) => {
  return (dispatch) => {
    return axios
      .get(`/users/${userId}/profile`, {
        "X-ACCESS-TOKEN": TOKEN,
      })
      .then((res) => {
        dispatch(setUserDeals(res.data.result));
      })
      .catch(() => {});
  };
};

// 액션생성 함수 만들기
export const setUserDeals = (userObj) => {
  return {
    type: SET_USER_DEALS,
    userObj,
  };
};
