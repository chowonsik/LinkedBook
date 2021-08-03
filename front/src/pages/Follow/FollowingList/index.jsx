import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getFollowingList, setFollowState } from "../../../actions/Follow";
import { Wrapper } from "./styles";
import Header from "../../../components/Layout/Header";
import FollowItem from "../../../components/Follow/FollowItem";
import CheckFollowCancle from "../../../components/Follow/CheckFollowCancle";

function FollowingList({ followingList, getFollowingList, setFollowState }) {
  const [followingUserId, setFollowingUserId] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    getFollowingList("following");
  }, [active]);

  // 팔로잉 버튼을 클릭했을 때 실행되는 함수
  function handleClick(e) {
    if (active) {
      return;
    }
    // 알림창이 활성화 된다.
    setActive(true);
    // 팔로잉하는 유저의 id를 string 형태로 저장한다.
    setFollowingUserId(e.target.id);
  }

  // 알림창에서 취소 또는 확인 버튼을 클릭했을 때 실행되는 함수
  function handleClickModal(e) {
    const value = e.target.id;
    if (value === "check") {
      const data = {
        toUserId: 5, // store에서 전달받아야 함
        fromUserId: Number(followingUserId),
        status: "DELETED",
      };
      setFollowState(data);
      getFollowingList("following");
    }
    setActive(false);
    setFollowingUserId("");
  }
  return (
    <Wrapper>
      <Header isBack={true} isAlarm={true} title={"팔로잉"} />
      <FollowItem
        profileImage={
          "https://drive.google.com/uc?id=1tf7W-Kb9p7eAfRbPx1fVCRrpPvyJSueR"
        }
        nickName={"정다은"}
        isFollow={true}
        userId={1}
        onClick={handleClick}
      />
      {followingList.map((following) => {
        <FollowItem
          profileImage={following.user.image}
          nickName={following.user.nickname}
          isFollow={true}
          userId={following.user.userId}
          onClick={handleClick}
          key={following.user.userId}
        />;
      })}

      <CheckFollowCancle
        title="팔로우를 취소하시겠습니까?"
        isActive={active}
        onClick={handleClickModal}
      />
    </Wrapper>
  );
}

function mapStateToProps(state) {
  return {
    followingList: state.followReducer.followingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getFollowingList: (info) => dispatch(getFollowingList(info)),
    setFollowState: (data) => dispatch(setFollowState(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
