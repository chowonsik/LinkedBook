import { useState } from "react";
import { useDispatch } from "react-redux";
import { createRoom } from "../../../actions/Chat";
import { useHistory } from "react-router";
function TestChat() {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  function handleChangeUser(e) {
    setUserName(e.target.value);
  }

  function handleClick() {
    dispatch(createRoom(userName, history));
  }
  return (
    <>
      <input
        placeholder="user name 입력"
        onChange={handleChangeUser}
        value={userName}
      />
      <button onClick={handleClick}>채팅방 생성</button>
    </>
  );
}

export default TestChat;
