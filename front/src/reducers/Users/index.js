import { SET_USER_PROFILE } from "../../actions/Users";

const INIT_STATE = {
  userProfile: {},
import {
  ADD_AREA,
  SET_AREAS,
  SET_SELECTED_AREA,
  SET_SELECTED_AREA_INDEX,
} from "../../actions/Users";

const INIT_STATE = {
  areas: [],
  selectedAreaIndex: -1,
  selectedArea: {},
};

export const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userObj,
    case SET_AREAS:
      return {
        ...state,
        areas: action.areas,
      };
    case SET_SELECTED_AREA_INDEX:
      return {
        ...state,
        selectedAreaIndex: action.index,
      };
    case SET_SELECTED_AREA:
      return {
        ...state,
        selectedArea: action.area,
      };
    case ADD_AREA:
      return {
        ...state,
        areas: state.areas.concat(action.area),
      };
    default:
      return state;
  }
};
