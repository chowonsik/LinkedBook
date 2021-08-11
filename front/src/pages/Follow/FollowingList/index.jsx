import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import { getFollowingList, deleteFollowing } from "../../../actions/Follow";
import { Wrapper, Container } from "./styles";
import Header from "../../../components/Layout/Header";
import FollowItem from "../../../components/Follow/FollowItem";
import CheckFollowCancle from "../../../components/Follow/CheckFollowCancle";
import { setFollowReset } from "../../../actions/Follow";
function FollowingList({ followingList, getFollowingList, deleteFollowing }) {
  const [followingUserId, setFollowingUserId] = useState("");
  const [height, setHeight] = useState(0);
  const [active, setActive] = useState(false);
  const currentPage = useSelector((state) => state.followReducer.currentPage);
  const totalPages = useSelector((state) => state.followReducer.totalPages);
  const totalElements = useSelector(
    (state) => state.followReducer.totalElements
  );

  useEffect(() => {
    handleSetHeight();
    const params = {
      page: 0,
      size: 15,
    };
    getFollowingList(params);
  }, []);

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
    // 팔로잉 취소했을 때 지금까지의 개수만큼 다시 불러옴
    if (value === "check") {
      deleteFollowing(followingUserId);
      const params = {
        page: 0,
        size: followingList.length,
      };
      getFollowingList(params);
    }
    setActive(false);
    setFollowingUserId("");
  }

  function handleScroll(e) {
    if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
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
          followingList.map((following, idx) => (
            <FollowItem
              profileImage={following.user.image}
              nickName={following.user.nickname}
              isFollow={true}
              isF4F={following.f4f}
              followId={following.follow.id}
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
