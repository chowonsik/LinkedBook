import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Wrapper } from "./styles";
import AlarmActItem from "./AlarmActItem";
import DealComplete from "../../deal/DealComplete";
import { getActAlarm, updateAlarmStatus } from "../../../actions/Alarm";
function AlarmAct({ height }) {
  const dispatch = useDispatch();
  const [completePageShow, setCompletePageShow] = useState(false);
  const [evalId, setEvalId] = useState(0);
  const [fromUser, setFromUser] = useState({});
  const currentPage = useSelector((state) => state.alarmReducer.actCurrentPage);
  const totalPages = useSelector((state) => state.alarmReducer.actTotalPages);
  const totalElements = useSelector(
    (state) => state.alarmReducer.actTotalElements
  );
  const alarmActList = useSelector((state) => state.alarmReducer.alarmActList);
  useEffect(() => {
    const params = {
      type: "act",
      page: 0,
      size: 15,
    };
    dispatch(getActAlarm(params));
  }, []);

  function handleTimeLog(date) {
    const now = new Date();
    const past = new Date(date);

    const betweenTime = Math.floor(
      (now.getTime() - past.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  function handleScroll(e) {
    if (
      parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight) ===
      parseInt(e.target.scrollHeight)
    ) {
      if (currentPage < totalPages && alarmActList.length < totalElements) {
        const params = {
          type: "act",
          page: currentPage + 1,
          size: 15,
        };

        dispatch(getActAlarm(params));
      }
    }
  }
  function handleClickAlarm(id) {
    dispatch(updateAlarmStatus(id));
    const params = {
      type: "act",
      page: 0,
      size: alarmActList.length,
    };
    dispatch(getActAlarm(params));
  }

  function handleClickDealDone(alarmId, evalId, fromUser) {
    dispatch(updateAlarmStatus(alarmId));
    setEvalId(evalId);
    setFromUser(fromUser);
    setCompletePageShow(true);
  }
  function handleCancleButtonClick() {
    setCompletePageShow(false);
  }

  return (
    <Wrapper onScroll={handleScroll} height={height}>
      <DealComplete
        show={completePageShow}
        onCancleButtonClick={handleCancleButtonClick}
        evalId={evalId}
        fromUser={fromUser}
        flag={false}
      ></DealComplete>
      {alarmActList &&
        [...new Set(alarmActList)].map(
          (alarm) =>
            alarm.status === "UNCHECKED" && (
              <AlarmActItem
                type={alarm.type}
                alarmId={alarm.id}
                userId={alarm.fromUser.id}
                dealId={alarm.deal && alarm.deal.id}
                nickName={alarm.fromUser.nickname}
                bookTitle={alarm.deal && alarm.deal.book}
                evalId={alarm.evalId}
                fromUser={alarm.fromUser}
                createdAt={handleTimeLog(alarm.created_at)}
                onClick={handleClickAlarm}
                key={alarm.id}
                onClickDealDone={handleClickDealDone}
              />
            )
        )}
    </Wrapper>
  );
}

export default AlarmAct;
