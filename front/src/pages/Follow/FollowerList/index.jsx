import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Wrapper } from "./styles";
import Header from "../../../components/Layout/Header";
import CheckFollowCancle from "../../../components/Follow/CheckFollowCancle";
import FollowItem from "../../../components/Follow/FollowItem";
import { getFollowerList, setFollowState } from "../../../actions/Follow";

function FollowerList({ followerList, getFollowerList, setFollowState }) {
  const [followerUserId, setFollowerUserId] = useState("");
  const [active, setActive] = useState(false);
  useEffect(() => {
    getFollowerList("follower");
  }, [active]);

  function handleClick(e) {
    if (active) {
      return;
    }
    setFollowerUserId(e.target.id);

    const type = e.target.innerText;
    if (type === "팔로우") {
      const data = {
        toUserId: 5,
        fromUserId: Number(followerUserId),
        status: "ACTIVATE",
      };
      setFollowState(data);
      getFollowerList("follower");
    } else {
      setActive(true);
    }
  }

  function handleClickModal(e) {
    const value = e.target.id;

    if (value === "check") {
      const data = {
        toUserId: 5, // 추후에 변경
        fromUserId: Number(followerUserId),
        status: "DELETED",
      };
      setFollowState(data);
      setActive(false);
      getFollowerList("follower");
    }
  }
  return (
    <Wrapper>
      <Header isBack={true} isAlarm={true} title={"팔로워"} />
      <FollowItem
        profileImage={
          "https://drive.google.com/uc?id=1tf7W-Kb9p7eAfRbPx1fVCRrpPvyJSueR"
        }
        nickName={"정다은"}
        isFollow={false}
        userId={2}
        onClick={handleClick}
      />
      <FollowItem
        profileImage={
          "https://drive.google.com/uc?id=1tf7W-Kb9p7eAfRbPx1fVCRrpPvyJSueR"
        }
        nickName={"정다은"}
        isFollow={true}
        userId={3}
        onClick={handleClick}
      />
      {followerList.map((follower) => {
        <FollowItem
          profileImage={follower.user.image}
          nickName={follower.user.nickname}
          isFollow={follower.user.status === "ACTIVATE" ? true : false}
          userId={follower.user.userId}
          onClick={handleClick}
          key={follower.user.userId}
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
    followerList: state.followReducer.followerList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowerList: (info) => dispatch(getFollowerList(info)),
    setFollowState: (data) => dispatch(setFollowState(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);
