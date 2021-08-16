import {
  SET_ALARM_FOLLOW_LIST,
  SET_ALARM_FOLLOW_PAGE,
  SET_ALARM_ACT_LIST,
  SET_ALARM_ACT_PAGE,
  SET_NEW_ALARM,
} from "../../actions/Alarm";

const INIT_STATE = {
  followCurrentPage: 0,
  followTotalPages: 0,
  followTotalElements: 0,
  alarmFollowList: [],
  actCurrentPage: 0,
  actTotalPages: 0,
  actTotalElements: 0,
  alarmActList: [],
  isNewAlarm: false,
};

export const alarmReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_ALARM_FOLLOW_LIST:
      return {
        ...state,
        alarmFollowList:
          action.currentPage === 0
            ? [...action.alarmFollowList]
            : state.alarmFollowList.concat(...action.alarmFollowList),
      };
    case SET_ALARM_FOLLOW_PAGE:
      return {
        ...state,
        followCurrentPage: action.followCurrentPage,
        followTotalPages: action.followTotalPages,
        followTotalElements: action.followTotalElements,
      };
    case SET_ALARM_ACT_LIST:
      return {
        ...state,
        alarmActList:
          action.currentPage === 0
            ? [...action.alarmActList]
            : state.alarmActList.concat(...action.alarmActList),
      };
    case SET_ALARM_ACT_PAGE:
      return {
        ...state,
        actCurrentPage: action.currentPage,
        actTotalPages: action.totalPages,
        actTotalElements: action.totalElements,
      };
    case SET_NEW_ALARM:
      return {
        ...state,
        isNewAlarm: action.code,
      };
    default:
      return state;
  }
};
