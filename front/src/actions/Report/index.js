import axios from "axios";
import { request, requestGet } from "../../api";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjE4LCJpYXQiOjE2MjgyMzgxNTl9.7Qx7jQ6MJavdFlLAIF1GXqg-eSd5g4X68iiRztL2tew";

export const SET_REPORT = "SET_REPORT";
export const SET_LIKE_COMMENTS = "SET_LIKE_COMMENTS";
export const SET_LIKE_COMMENTS_PAGE = "SET_LIKE_COMMENTS_PAGE";
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

export const getLikeComments = (params) => {
  return (dispatch) => {
    const response = requestGet("/like-comments", params);
    response.then((res) => {
      const currentPage = res.page.currentPage;
      const totalPages = res.page.totalPages;
      const totalElements = res.page.totalElements;
      dispatch(setLikeCommentsPage(currentPage, totalPages, totalElements));
      dispatch(setLikeComments(res.result, currentPage));
    });
  };
};

export const setLikeComments = (likeComments, currentPage) => {
  return {
    type: SET_LIKE_COMMENTS,
    likeComments,
    currentPage,
  };
};

export const setLikeCommentsPage = (currentPage, totalPages, totalElements) => {
  return {
    type: SET_LIKE_COMMENTS_PAGE,
    currentPage,
    totalPages,
    totalElements,
  };
};
