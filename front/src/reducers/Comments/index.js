import { SET_USER_COMMENTS } from "../../actions/Comments";

const INIT_STATE = {
  comments: [],
};

export const commentReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    default:
      return state;
  }
};
