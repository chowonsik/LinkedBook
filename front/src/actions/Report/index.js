import axios from "axios";
import { request } from "../../api";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE2MjgyMzgxNTl9.7Qx7jQ6MJavdFlLAIF1GXqg-eSd5g4X68iiRztL2tew";

export const SET_REPORT = "SET_REPORT";
/*export const setReport = (data, history) => {
  console.log("axios");
  return () => {
    return axios
      .post("/reports", data, {
        "X-ACCESS-TOKEN": token,
      })
      .then((res) => {
        console.log(data);
        console.log(res);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };
};*/

export const setReport = (data, history) => {
  return () => {
    const response = request("post", "/api/reports", data, {
      "X-ACCESS-TOKEN": token,
    });
    response.then((res) => console.log(res));
  };
};
