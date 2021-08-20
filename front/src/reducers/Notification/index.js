import { HIDE_TOAST, SHOW_TOAST } from "../../actions/Notification";
import { colors } from "../../styles";

const INIT_STATE = {
  toastShow: false,
  toastMessage: "토스트 메시지!",
};

export const notificationReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_TOAST:
      if (state.toastShow) {
        return state;
      }
      return {
        ...state,
        toastShow: true,
        toastMessage: action.toast.message,
      };
    case HIDE_TOAST:
      return {
        ...state,
        toastShow: false,
      };

    default:
      return state;
  }
};
