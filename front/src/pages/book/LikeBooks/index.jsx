import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Header from "../../../components/Layout/Header";
import FollowItem from "../../../components/Follow/FollowItem";
import { getLikeBooks } from "../../../actions/Books";
import { createFollow, deleteFollowing } from "../../../actions/Follow";
import { Wrapper, Container } from "./styles";
function LikeBooks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const likeBooks = useSelector((state) => state.bookReducer.likeBooks);
  const currentPage = useSelector((state) => state.bookReducer.likeCurrentPage);
  const totalPages = useSelector((state) => state.bookReducer.likeTotalPages);
  const totalElements = useSelector(
    (state) => state.bookReducer.likeTotalElements
  );
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [bookId, setBookId] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    handleSetHeight();
    const historyList = history.location.pathname.split("/");
    setBookId(historyList[historyList.length - 1]);
    const params = {
      bookId: historyList[historyList.length - 1],
      page: 0,
      size: 15,
    };
    dispatch(getLikeBooks(params));
  }, []);

  function handleClick(e) {
    const type = e.target.innerText;
    console.log(e.target.id);
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
      bookId,
      page: 0,
      size: likeBooks.length,
    };
    dispatch(getLikeBooks(params));
  }

  function handleScroll(e) {
    if (
      parseInt(e.target.scrollTop) + parseInt(e.target.clientHeight) ===
      parseInt(e.target.scrollHeight)
    ) {
      if (currentPage < totalPages && likeBooks.length < totalElements) {
        const params = {
          bookId,
          page: currentPage + 1,
          size: 15,
        };
        dispatch(getLikeBooks(params));
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
        {LikeBooks &&
          [...new Set(likeBooks)].map((book, idx) => (
            <FollowItem
              loginUserId={loginUser.id}
              profileImage={book.user.image}
              nickName={book.user.nickname}
              isFollow={false}
              isF4F={book.follow.f4f}
              userId={book.user.id}
              followId={book.follow.id}
              onClick={handleClick}
              key={idx}
            />
          ))}
      </Container>
    </Wrapper>
  );
}

export default LikeBooks;
