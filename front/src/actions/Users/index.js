import { requestGet } from "../../api.js";

export const SET_AREAS = "SET_AREAS";
export const SET_SELECTED_AREA_INDEX = "SET_SELECTED_AREA_INDEX";
export const ADD_AREA = "ADD_AREA";
export const DELETE_AREA = "DELETE_AREA";

export const setAreas = (areas) => {
  return {
    type: SET_AREAS,
    areas: areas,
  };
};

export const setSelectedAreaIndex = (index) => {
  return {
    type: SET_SELECTED_AREA_INDEX,
    index: index,
  };
};

export const addArea = (area) => (dispatch, getState) => {
  const areas = getState().userReducer.areas;
  const newArea = {
    areaId: area.areaId,
    orders: areas.length + 1,
    areaDongmyeonri: area.dong,
  };
  for (let i = 0; i < areas.length; i++) {
    if (areas[i].areaId === newArea.areaId) return;
  }
  dispatch(setAreas(areas.concat(newArea)));
};

export const deleteArea = (index) => (dispatch, getState) => {
  const newAreas = getState().userReducer.areas.filter(
    (area, i) => i !== index
  );
  if (getState().userReducer.selectedAreaIndex > index) {
    dispatch(setSelectedAreaIndex(index));
  }
  dispatch(setAreas(newAreas));
};
