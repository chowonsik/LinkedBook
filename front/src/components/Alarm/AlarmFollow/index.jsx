import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createFollow } from "../../../actions/Follow";
import { getFollowAlarm, updateAlarmStatus } from "../../../actions/Alarm";
import { showToast } from "../../../actions/Notification";
import { Wrapper } from "./styles";
import AlarmFollowItem from "./AlarmFollowItem";
function AlarmFollow({ height }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const params = {
      type: "follow",
      page: 0,
      size: 15,
    };
    dispatch(getFollowAlarm(params));
  }, []);
  const alarmFollowList = useSelector(
    (state) => state.alarmReducer.alarmFollowList
  );
  const currentPage = useSelector(
    (state) => state.alarmReducer.followCurrentPage
  );
  const totalPages = useSelector(
    (state) => state.alarmReducer.followTotalPages
  );
  const totalElements = useSelector(
    (state) => state.alarmReducer.followTotalElements
  );

  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));

  function handleClickCheck(e, alarmId, nickname) {
    const toUserId = parseInt(e.target.id);
    if (e.target.classList.contains("check")) {
      const data = {
        toUserId,
        fromUserId: loginUser.id,
      };
      dispatch(showToast(`${nickname}님을 팔로우했습니다.`));
      dispatch(createFollow(data));
    }
    dispatch(updateAlarmStatus(alarmId));
  }

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
      if (currentPage < totalPages && alarmFollowList.length < totalElements) {
        const params = {
          type: "follow",
          page: currentPage + 1,
          size: 15,
        };
        dispatch(getFollowAlarm(params));
      }
    }
  }

  return (
    <Wrapper onScroll={handleScroll} height={height}>
      {alarmFollowList &&
        [...new Set(alarmFollowList)].map(
          (alarm) =>
            alarm.status === "UNCHECKED" && (
              <AlarmFollowItem
                userId={alarm.fromUser.id}
                nickname={alarm.fromUser.nickname}
                createdAt={handleTimeLog(alarm.created_at)}
                onClickCheck={handleClickCheck}
                alarmId={alarm.id}
                key={alarm.id}
              />
            )
        )}
    </Wrapper>
  );
}

export default AlarmFollow;
