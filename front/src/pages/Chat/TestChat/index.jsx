import { useState } from "react";
import { useDispatch } from "react-redux";
import { CreateRoom } from "../../../actions/Chat";
function TestChat() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const dispatch = useDispatch();

  function handleChangeUser(e) {
    setUserName(e.target.value);
  }

  function handleChangeRoomId(e) {
    setRoomId(e.target.value);
  }

  function handleClick() {
    dispatch(CreateRoom(roomId, userName));
  }
  return (
    <>
      <input
        placeholder="user name 입력"
        onChange={handleChangeUser}
        value={userName}
      />
      <input
        placeholder="거래 번호 입력"
        onChange={handleChangeRoomId}
        value={roomId}
      />
      <button onClick={handleClick}>채팅방 생성</button>
    </>
  );
}

export default TestChat;
