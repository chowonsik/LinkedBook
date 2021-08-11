import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import { Wrapper, Container } from "./styles";
import Header from "../../../components/Layout/Header";
import CheckFollowCancle from "../../../components/Follow/CheckFollowCancle";
import FollowItem from "../../../components/Follow/FollowItem";
import { setFollowReset, setLoginUserInfo } from "../../../actions/Follow";
import {
  getFollowerList,
  deleteFollowing,
  createFollow,
} from "../../../actions/Follow";

function FollowerList({
  followerList,
  getFollowerList,
  deleteFollowing,
  createFollow,
}) {
  const [followerUserId, setFollowerUserId] = useState("");
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(0);
  const currentPage = useSelector((state) => state.followReducer.currentPage);
  const totalPages = useSelector((state) => state.followReducer.totalPages);
  const totalElements = useSelector(
    (state) => state.followReducer.totalElements
  );
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));

  useEffect(() => {
    handleSetHeight();
    const params = {
      page: 0,
      size: 15,
    };
    getFollowerList(params);
  }, []);

  function handleClick(e) {
    if (active) {
      return;
    }

    const type = e.target.innerText;
    if (type === "팔로우") {
      const data = {
        toUserId: Number(e.target.id),
        fromUserId: loginUser.id,
      };
      createFollow(data);
      const params = {
        page: 0,
        size: followerList.length,
      };
      getFollowerList(params);
    } else {
      setFollowerUserId(e.target.id);
      setActive(true);
    }
  }

  function handleClickModal(e) {
    const value = e.target.id;

    if (value === "check") {
      deleteFollowing(followerUserId);
      const params = {
        page: 0,
        size: followerList.length,
      };
      getFollowerList(params);
    }
    setActive(false);
  }

  function handleScroll(e) {
    if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      if (currentPage < totalPages && followerList.length < totalElements) {
        const params = {
          page: currentPage + 1,
          size: 15,
        };
        getFollowerList(params);
      }
    }
  }

  function handleSetHeight() {
    const innerHeight = window.innerHeight;
    setHeight(innerHeight - 55);
  }
  return (
    <Wrapper>
      <Header isBack={true} isAlarm={true} title={"팔로워"} />
      <Container onScroll={handleScroll} height={height}>
        {followerList &&
          followerList.map((follower, idx) => (
            <FollowItem
              profileImage={follower.user.image}
              nickName={follower.user.nickname}
              isFollow={false}
              isF4F={follower.follow.f4f}
              userId={follower.user.id}
              followId={follower.follow.id}
              onClick={handleClick}
              key={idx}
            />
          ))}
      </Container>
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
    followingList: state.followReducer.followingList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowerList: (params) => dispatch(getFollowerList(params)),
    deleteFollowing: (params) => dispatch(deleteFollowing(params)),
    createFollow: (data) => dispatch(createFollow(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowerList);
