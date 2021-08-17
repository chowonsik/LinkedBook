import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserComments } from "../../../actions/Comments";
import CommentItem from "../../../components/Profile/CommentItem";
import Header from "../../../components/Layout/Header";
import { Wrapper } from "./styles";
import { useHistory } from "react-router";
import { useState } from "react";

const MyComments = ({ match }) => {
  const dispatch = useDispatch();
  const userId = match.params.id;
  const userComments = useSelector((state) => state.commentReducer.comments);
  const listHeight = window.innerHeight - 55;

  async function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    if (userComments && userComments.length % 10 !== 0) return;
    const page = parseInt(userComments.length / 10);
    await dispatch(getUserComments(userId, page));
  }

  useEffect(() => {
    dispatch(getUserComments(userId));
  }, []);
  return (
    <>
      <Header isBack title="한줄평" />
      <Wrapper onScroll={handleScroll} height={listHeight}>
        {userComments?.map((commentInfo) => (
          <CommentItem commentInfo={commentInfo} />
        ))}
      </Wrapper>
    </>
  );
};
export default MyComments;
