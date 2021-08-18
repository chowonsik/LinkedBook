import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import { getFollowingList, deleteFollowing } from "../../../actions/Follow";
import { Wrapper, Container } from "./styles";
import Header from "../../../components/Layout/Header";
import FollowItem from "../../../components/Follow/FollowItem";
import CheckFollowCancle from "../../../components/Follow/CheckFollowCancle";
import { updateFollowingList } from "../../../actions/Follow";
function FollowingList({ followingList, getFollowingList, deleteFollowing }) {
  const [followingUserId, setFollowingUserId] = useState("");
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState(false);
  const currentPage = useSelector((state) => state.followReducer.currentPage);
  const totalPages = useSelector((state) => state.followReducer.totalPages);
  const totalElements = useSelector(
    (state) => state.followReducer.totalElements
  );
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(setFollowReset());
    handleSetHeight();
    const params = {
      page: 0,
      size: 15,
    };
    getFollowingList(params);
  }, []);

  // 팔로잉 버튼을 클릭했을 때 실행되는 함수
  function handleClick(e) {
    deleteFollowing(parseInt(e.target.id));
    const params = {
      page: 0,
      size: followingList.length,
    };
    getFollowingList(params);
  }

  function handleScroll(e) {
    if (
      parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight) ===
      parseInt(e.target.scrollHeight)
    ) {
      if (currentPage < totalPages && followingList.length < totalElements) {
        const params = {
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
              isFollow={true}
              isF4F={following.f4f}
              followId={following.id}
              onClick={handleClick}
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
