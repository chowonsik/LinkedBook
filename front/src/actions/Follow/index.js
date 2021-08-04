import axios from "axios";
export const SET_FOLLOWING_LIST = "SET_FOLLOWING_LIST";
export const SET_FOLLOWER_LIST = "SET_FOLLOWER_LIST";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

// 팔로잉 리스트 불러오기
export const getFollowingList = (info) => {
  return (dispatch) => {
    return axios
      .get(`/follow/follower`, {
        "X-ACCESS-TOKEN": token,
      })
      .then((res) => {
        dispatch(setFollowingList(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setFollowingList = (followings) => {
  return {
    type: SET_FOLLOWING_LIST,
    followings,
  };
};

// 팔로우 상태 변경하기
export const setFollowState = (data) => {
  return (dispatch) => {
    return axios
      .post("/follow", data, { "X-ACCESS-TOKEN": token })
      .then((res) => {
        console.log(res.data);
      });
  };
};

// 팔로워 리스트 불러오기
export const getFollowerList = (info) => {
  return (dispatch) => {
    return axios
      .get(`/follow/${info}`, { "X-ACCESS-TOKEN": token })
      .then((res) => {
        dispatch(setFollowerList(res.data.result));
      });
  };
};

export const setFollowerList = (followers) => {
  return {
    type: SET_FOLLOWER_LIST,
    followers,
  };
};
