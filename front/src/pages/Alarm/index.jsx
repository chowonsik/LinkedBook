import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../../components/Layout/Header";

import AlarmAct from "../../components/Alarm/AlarmAct";
import AlarmFollow from "../../components/Alarm/AlarmFollow";
import { setNewAlarm } from "../../actions/Alarm";
import { Wrapper, AlarmType, AlarmTypeItem, ContentContainer } from "./styles";
function Alarm() {
  const [type, setType] = useState(true);
  const [height, setHeight] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    handleSetHeight();
  }, []);
  function handleClickType() {
    setType(!type);
  }
  function handleSetHeight() {
    const innerHeight = window.innerHeight;
    setHeight(innerHeight - 55);
  }
  return (
    <Wrapper>
      <Header isBack={true} title={"새소식"}></Header>
      <AlarmType onClick={handleClickType}>
        <AlarmTypeItem isType={type}>팔로우</AlarmTypeItem>
        <AlarmTypeItem isType={!type}>활동</AlarmTypeItem>
      </AlarmType>
      {type ? <AlarmFollow height={height} /> : <AlarmAct height={height} />}
    </Wrapper>
  );
}

export default Alarm;

/*
공통
- 알람 생성일을 기준으로 시간이 얼마나 지났는지 파악하는 함수 => 전달받은 createAt으로 파악 후 리턴
- 시간 순으로 정렬 => sort에 함수 전달 => now를 기준으로 a - b

Follow
- alarmList & alarmList.filter((alarm) => alarm.type === "FOLLOW") -> AlarmFollow에 넘기기

*/
