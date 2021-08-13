import axios from "axios";
import { useHistory } from "react-router";
export const CreateRoom = (roomId, userName) => {
  const history = useHistory();
  return function (dispatch) {
    const token = JSON.parse(localStorage.getItem("loginUser")).accessToken;
    const params = {
      url: "/api/chat/room",
      method: "POST",
      data: {
        name: userName,
        roomName: roomId,
      },
    };
    axios(params)
      .then((response) => {
        console.log(response.data);
        history.push(`/chat/room/${roomId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
