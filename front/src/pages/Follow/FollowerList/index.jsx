import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Wrapper, Container } from "./styles";
import Header from "../../../components/Layout/Header";

import FollowItem from "../../../components/Follow/FollowItem";

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
  const [height, setHeight] = useState(0);
  const history = useHistory();
  const [pUserId, setPuserId] = useState("");
  const currentPage = useSelector((state) => state.followReducer.currentPage);
  const totalPages = useSelector((state) => state.followReducer.totalPages);
  const totalElements = useSelector(
    (state) => state.followReducer.totalElements
  );
  const loginUser = JSON.parse(window.localStorage.getItem("loginUser"));

  useEffect(() => {
    handleSetHeight();
    const paths = history.location.pathname.split("/");
    setPuserId(parseInt(paths[paths.length - 1]));

    const params = {
      id: parseInt(paths[paths.length - 1]),
      page: 0,
      size: 15,
    };
    getFollowerList(params);
  }, []);

  function handleClick(e) {
    const type = e.target.innerText;
    if (type === "팔로우") {
      const data = {
        toUserId: parseInt(e.target.id),
        fromUserId: loginUser.id,
      };
      createFollow(data);
      const params = {
        id: pUserId,
        page: 0,
        size: followerList.length,
      };
      getFollowerList(params);
    } else {
      deleteFollowing(e.target.id);
      const params = {
        id: pUserId,
        page: 0,
        size: followerList.length,
      };
      getFollowerList(params);
    }
  }

  function handleScroll(e) {
    if (
      parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight) ===
      parseInt(e.target.scrollHeight)
    ) {
      if (currentPage < totalPages && followerList.length < totalElements) {
        const params = {
          id: pUserId,
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
          [...new Set(followerList)].map((follower, idx) => (
            <FollowItem
              profileImage={follower.user.image}
              nickName={follower.user.nickname}
              isFollow={false}
              isF4F={follower.follow.f4f}
              userId={follower.user.id}
              followId={follower.follow.id}
              onClick={handleClick}
              loginUserId={loginUser.id}
              key={idx}
            />
          ))}
      </Container>
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
