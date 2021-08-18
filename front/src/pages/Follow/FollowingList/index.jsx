import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  getFollowingList,
  deleteFollowing,
  createFollow,
} from "../../../actions/Follow";
import { Wrapper, Container } from "./styles";
import Header from "../../../components/Layout/Header";
import FollowItem from "../../../components/Follow/FollowItem";

function FollowingList({ followingList, getFollowingList, deleteFollowing }) {
  const [height, setHeight] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();
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

    getFollowingList(params);
  }, []);

  // 팔로잉 버튼을 클릭했을 때 실행되는 함수
  /* function handleClick(e) {
    
    deleteFollowing(parseInt(e.target.id));
  }*/
  function handleClick(e) {
    const type = e.target.innerText;
    if (type === "팔로우") {
      const data = {
        toUserId: parseInt(e.target.id),
        fromUserId: loginUser.id,
      };
      dispatch(createFollow(data));
      const params = {
        id: pUserId,
        page: 0,
        size: followingList.length,
      };
      getFollowingList(params);
    } else {
      deleteFollowing(e.target.id);
      const params = {
        id: pUserId,
        page: 0,
        size: followingList.length,
      };
      getFollowingList(params);
    }
  }
  function handleScroll(e) {
    if (
      parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight) ===
      parseInt(e.target.scrollHeight)
    ) {
      if (currentPage < totalPages && followingList.length < totalElements) {
        const params = {
          id: pUserId,
          page: currentPage + 1,
          size: 15,
        };
        getFollowingList(params);
      }
    }
  }
  function handleSetHeight() {
    const innerHeight = window.innerHeight;
    setHeight(innerHeight - 55);
  }
  return (
    <Wrapper>
      <Header isBack={true} isAlarm={true} title={"팔로잉"} />
      <Container onScroll={handleScroll} height={height}>
        {followingList &&
          [...new Set(followingList)].map((following, idx) => (
            <FollowItem
              profileImage={following.user.image}
              nickName={following.user.nickname}
              isFollow={false}
              isF4F={following.follow.f4f}
              followId={following.follow.id}
              userId={following.user.id}
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
    followingList: state.followReducer.followingList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getFollowingList: (info) => dispatch(getFollowingList(info)),
    deleteFollowing: (params) => dispatch(deleteFollowing(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowingList);
