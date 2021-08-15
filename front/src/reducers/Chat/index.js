import { SET_FROM_USER, SET_TO_USER } from "../../actions/Chat";

const INIT_STATE = {
  fromUser: {},
  toUser: {},
};

export const chatReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_FROM_USER:
      return {
        ...state,
        fromUser: action.fromUser,
      };
    case SET_TO_USER:
      return {
        ...state,
        toUser: action.toUser,
      };
    default:
      return state;
  }
};
