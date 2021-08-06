import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImlhdCI6MTYyNzM5Mzg1NH0.D07COiIiT_BVqFvyfr7wjAhZLcQ-svD3vpx0-HUgkZ4";

export const SET_REPORT = "SET_REPORT";
export const setReport = (data, history) => {
  return () => {
    return axios
      .post("/api/reports", data, {
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
