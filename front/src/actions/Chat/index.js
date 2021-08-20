import { request } from "../../api";
import { showToast } from "../Notification";

export const SET_FROM_USER = "SET_FROM_USER";
export const SET_TO_USER = "SET_TO_USER";

export const createRoom =
  (dealId, toUser, fromUser, history) => async (dispatch) => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const data = {
      name: `deal${dealId} user ${loginUser.id} and ${toUser.toUserId}`,
      dealId: dealId,
    };
    const response = await request("POST", "/chat/room", data);
    if (response.isSuccess) {
      history.push({
        pathname: `/chat/room/${response.result.room_id}`,
        state: {
          toUser: toUser,
          fromUser: fromUser,
          create: true,
        },
      });
    } else {
      dispatch(showToast("채팅방 생성에 실패했습니다."));
    }
  };
