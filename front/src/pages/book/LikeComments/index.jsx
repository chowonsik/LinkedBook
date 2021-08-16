import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../../components/Layout/Header";
import FollowItem from "../../../components/Follow/FollowItem";
import { getLikeComments } from "../../../actions/Report";
import { createFollow, deleteFollowing } from "../../../actions/Follow";
import { Wrapper, Container } from "./styles";
function LikeComments() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [commentId, setCommentId] = useState("");
  const [height, setHeight] = useState(0);
  const likeComments = useSelector((state) => state.reportReducer.likeComments);
  const currentPage = useSelector((state) => state.reportReducer.currentPage);
  const totalPages = useSelector((state) => state.reportReducer.totalPages);
  const totalElements = useSelector(
    (state) => state.reportReducer.totalElements
  );
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  useEffect(() => {
    handleSetHeight();
    const historyList = history.location.pathname.split("/");
    setCommentId(historyList[historyList.length - 2]);
    const params = {
      id: historyList[historyList.length - 2],
      page: 0,
      size: 3,
    };
    dispatch(getLikeComments(params));
  }, []);

  function handleClick(e) {
    const type = e.target.innerText;
    if (type === "팔로우") {
      const data = {
        toUserId: parseInt(e.target.id),
        fromUserId: loginUser.id,
      };
      dispatch(createFollow(data));
    } else {
      dispatch(deleteFollowing(e.target.id));
    }
    const params = {
      id: commentId,
      page: 0,
      size: likeComments.length,
    };
    dispatch(getLikeComments(params));
  }

  function handleScroll(e) {
    if (
      parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight) ===
      parseInt(e.target.scrollHeight)
    ) {
      if (currentPage < totalPages && likeComments.length < totalElements) {
        const params = {
          id: commentId,
          page: currentPage + 1,
          size: 3,
        };
        dispatch(getLikeComments(params));
      }
    }
  }

  function handleSetHeight() {
    const innerHeight = window.innerHeight;
    setHeight(innerHeight - 55);
  }
  return (
    <Wrapper>
      <Header isBack={true} title={"좋아요"} isAlarm={true} />
      <Container onScroll={handleScroll} height={height}>
        {likeComments &&
          [...new Set(likeComments)].map((comment, id) => (
            <FollowItem
              profileImage={comment.user.image}
              nickName={comment.user.nickname}
              isFollow={false}
              isF4F={comment.follow.f4f}
              onClick={handleClick}
              followId={comment.follow.id}
              userId={comment.user.id}
              loginUserId={loginUser.id}
            />
          ))}
      </Container>
    </Wrapper>
  );
}

export default LikeComments;
