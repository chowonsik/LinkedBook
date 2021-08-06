import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

export const SET_REPORT = "SET_REPORT";
export const setReport = (data, history) => {
  return (dispatch) => {
    return axios
      .post("http://i5b307.p.ssafy.io:8080/api/reports", data, {
        "X-ACCESS-TOKEN": token,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
