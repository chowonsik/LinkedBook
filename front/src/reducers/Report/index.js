import { SET_REPORT } from "../../actions/Report";

const INIT_STATE = {
  status: 0,
};

export const reportReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_REPORT:
      return {
        ...state,
        status: action.status,
      };
    default:
      return state;
  }
};
