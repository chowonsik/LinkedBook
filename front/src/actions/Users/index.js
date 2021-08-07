import { request } from "../../api";
import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

// 액션 타입 만들기
export const SET_USER_PROFILE = "SET_USER_PROFILE";

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    return await axios
      .get(`/users/${userId}/profile`, {
        "X-ACCESS-TOKEN": TOKEN,
      })
      .then((res) => {
        dispatch(setUserProfile(res.data.result));
      })
      .catch(() => {});

    // const response = await request("get", `/users/${userId}/profile`, {
    //   headers: {
    //     "X-ACCESS-TOKEN": TOKEN,
    //   },
    // });
    // dispatch(setUserProfile(response.result));
  };
};

// 액션생성 함수 만들기
export const setUserProfile = (userObj) => {
  return {
    type: SET_USER_PROFILE,
    userObj,
  };
};
