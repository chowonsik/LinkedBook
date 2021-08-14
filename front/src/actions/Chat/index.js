import axios from "axios";

export const createRoom = (userName, history) => {
  return function (dispatch) {
    const token = JSON.parse(localStorage.getItem("loginUser")).accessToken;
    const params = {
      url: "/api/chat/room",
      method: "POST",
      data: {
        name: userName
      },
    };
    axios(params)
      .then((response) => {
        console.log(response.data);
        history.push(`/chat/room/${response.data.result.room_id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
