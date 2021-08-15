import axios from "axios";
import { request, requestGet } from "../../api";
import { showToast } from "../Notification";

export const SET_FROM_USER = "SET_FROM_USER";
export const SET_TO_USER = "SET_TO_USER";

export const createRoom = (dealId, userId, history) => async (dispatch) => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const data = {
    name: `deal${dealId} user ${loginUser.id} and ${userId}`,
    dealId: dealId,
  };
  const response = await request("POST", "/chat/room", data);
  console.log(response);
  if (response.isSuccess) {
    history.push({
      pathname: `/chat/room/${response.result.room_id}`,
      toUserId: userId,
    });
  } else {
    dispatch(showToast("채팅방 생성에 실패했습니다."));
  }
  // const params = {
  //   url: "/api/chat/room",
  //   method: "POST",
  //   data: {
  //     name: userName,
  //     dealId: dealId,
  //   },
  // };
  // axios(params)
  //   .then((response) => {
  //     console.log(response.data);
  //     history.push(`/chat/room/${response.data.result.room_id}`);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
