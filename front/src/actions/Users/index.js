import { request } from "../../api";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

// 액션 타입 만들기
export const SET_USER_PROFILE = "SET_USER_PROFILE";

// 유저프로필 가져오기
export const getUserProfile = (userId) => {
  return async (dispatch) => {
    const response = await request("get", `/users/${userId}/profile`, {
      headers: {
        "X-ACCESS-TOKEN": TOKEN,
      },
    });
    dispatch(setUserProfile(response.result));
  };
};

export const updateUserProfile = (data) => {
  return async (dispatch) => {
    console.log(data);
    const response = await request("patch", `/users`, data, {
      "X-ACCESS-TOKEN": TOKEN,
    });
    console.log(response);
    dispatch(getUserProfile(3));
  };
};

// 액션생성 함수 만들기
export const setUserProfile = (userObj) => {
  return {
    type: SET_USER_PROFILE,
    userObj,
  };
};
