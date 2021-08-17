const INIT_STATE = {
  userDeals: {},
};

export const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        userDeals: action.userObj,
      };
    default:
      return state;
  }
};
