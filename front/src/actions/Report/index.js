import axios from "axios";
import { request } from "../../api";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE2MjgyMzgxNTl9.7Qx7jQ6MJavdFlLAIF1GXqg-eSd5g4X68iiRztL2tew";

export const SET_REPORT = "SET_REPORT";

export const setReport = (data) => {
  return (dispatch) => {
    const response = request("post", "/reports", data);
    response.then((res) => dispatch(setReportStatus(res.status)));
  };
};

export const setReportStatus = (status) => {
  return {
    type: SET_REPORT,
    status,
  };
};
