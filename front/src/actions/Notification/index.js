import { colors } from "../../styles";

export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";

export const showToast = (message = "메시지를 입력하세요") => {
  return {
    type: SHOW_TOAST,
    toast: {
      message,
    },
  };
};

export const hideToast = () => {
  return {
    type: HIDE_TOAST,
  };
};
