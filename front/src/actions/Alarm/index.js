import { request, requestGet, requestPatch } from "../../api";

export const SET_ALARM_FOLLOW_PAGE = "SET_ALARM_FOLLOW_PAGE";
export const SET_ALARM_FOLLOW_LIST = "SET_ALARM_FOLLOW_LIST";
export const SET_ALARM_ACT_LIST = "SET_ALARM_ACT_LIST";
export const SET_ALARM_ACT_PAGE = "SET_ALARM_ACT_PAGE";
export const SET_NEW_ALARM = "SET_NEW_ALARM";
export const getFollowAlarm = (params) => {
  return (dispatch) => {
    const response = requestGet("/alerts", params);

    response.then((res) => {
      const currentPage = res.page.currentPage;
      const totalPages = res.page.totalPages;
      const totalElements = res.page.totalElements;
      dispatch(setAlarmFollowPage(currentPage, totalPages, totalElements));

      dispatch(setAlarmFollowList(res.result, currentPage));
    });
  };
};

export const setAlarmFollowList = (alarmFollowList, currentPage) => {
  return {
    type: SET_ALARM_FOLLOW_LIST,
    alarmFollowList,
    currentPage,
  };
};

export const setAlarmFollowPage = (
  followCurrentPage,
  followTotalPages,
  followTotalElements
) => {
  return {
    type: SET_ALARM_FOLLOW_PAGE,
    followCurrentPage,
    followTotalPages,
    followTotalElements,
  };
};

export const updateAlarmStatus = (alarmId) => {
  return () => {
    const response = requestPatch(`/alerts/${alarmId}`);
  };
};

export const getActAlarm = (params) => {
  return (dispatch) => {
    const response = requestGet("/alerts", params);
    response.then((res) => {
      const currentPage = res.page.currentPage;
      const totalPages = res.page.totalPages;
      const totalElements = res.page.totalElements;
      dispatch(setAlarmActoPage(currentPage, totalPages, totalElements));
      dispatch(setAlarmActList(res.result, currentPage));
    });
  };
};

export const setAlarmActList = (alarmActList, currentPage) => {
  return {
    type: SET_ALARM_ACT_LIST,
    alarmActList,
    currentPage,
  };
};

export const setAlarmActoPage = (currentPage, totalPages, totalElements) => {
  return {
    type: SET_ALARM_ACT_PAGE,
    currentPage,
    totalPages,
    totalElements,
  };
};

export const checkNewAlarm = () => {
  return (dispatch) => {
    const response = requestGet("/alerts/check");
    response.then((res) => {
      if (res.code === 223) dispatch(setNewAlarm(true));
      else dispatch(setNewAlarm(false));
    });
  };
};

export const setNewAlarm = (code) => {
  return {
    type: SET_NEW_ALARM,
    code,
  };
};

export const createAlarm = (data) => {
  return () => {
    const response = request("post", "/alerts", data);
  };
};
