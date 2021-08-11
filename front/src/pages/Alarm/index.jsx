import { useState } from "react";

import Header from "../../components/Layout/Header";
import AlarmItem from "../../components/Alarm/AlarmItem";
import { Wrapper, AlarmType, AlarmTypeItem } from "./styles";
function Alarm() {
  const [type, setType] = useState(true);

  function handleClickType() {
    setType(!type);
  }

  return (
    <Wrapper>
      <Header isBack={true} title={"새소식"}></Header>
      <AlarmType onClick={handleClickType}>
        <AlarmTypeItem isType={type}>팔로우</AlarmTypeItem>
        <AlarmTypeItem isType={!type}>활동</AlarmTypeItem>
      </AlarmType>
    </Wrapper>
  );
}

export default Alarm;
