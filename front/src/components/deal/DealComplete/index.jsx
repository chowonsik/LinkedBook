import React, { useEffect, useState } from "react";
import { request, requestGet } from "../../../api";
import { Wrapper, Modal } from "./style";
import StarRatings from "react-star-ratings";
import { colors } from "../../../styles";
import { useDispatch } from "react-redux";
import { showToast } from "../../../actions/Notification";
import { useHistory } from "react-router-dom";
import { doRefresh } from "../../../actions/Deal";
export default function DealComplete({
  show,
  onCancleButtonClick,
  dealId,
  flag = true,
  evalId,
  fromUser,
}) {
  const [chatList, setChatList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [rating, setRating] = useState(3);
  const [showRatingPage, setShowRatingPage] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  async function complete() {
    let response;
    if (!evalId) {
      response = await request("POST", "/user-deals", {
        dealId: dealId,
        userId: selectedUser.id,
        score: rating,
      });
    } else {
      response = await request("PATCH", `/user-deals/${evalId}`, {
        score: rating,
      });
    }
    if (response.isSuccess) {
      dispatch(showToast("거래가 완료되었습니다."));
      dispatch(doRefresh());
      history.push("/");
      if (evalId) history.push("/alarm");
    } else {
      dispatch(showToast("실패함!"));
    }
  }

  function handleUserClick(i) {
    setSelectedUser(chatList[i]);
    setShowRatingPage(true);
  }

  function changeRating(newRating, name) {
    setRating(newRating);
  }

  async function getChatList() {
    const loginUserId = JSON.parse(localStorage.getItem("loginUser")).id;
    const response = await requestGet("/chat/rooms", { userId: loginUserId });
    const dealUserList = response.result
      .filter((chat) => chat.deal_id === dealId)
      .map((chat) => {
        if (chat.fromUserId === loginUserId) {
          return {
            id: chat.toUserId,
            nickname: chat.toUserNickname,
            image: chat.toUserImage,
          };
        } else {
          return {
            id: chat.fromUserId,
            nickname: chat.fromUserNickname,
            image: chat.fromUserImage,
          };
        }
      });
    setChatList(dealUserList);
  }

  useEffect(() => {
    if (evalId) {
      setSelectedUser(fromUser);
      setShowRatingPage(true);
    }
  }, [evalId]);
  useEffect(() => {
    if (dealId) {
      getChatList();
    }
  }, [dealId]);

  return (
    <>
      <Wrapper confirmShow={show}></Wrapper>
      <Modal confirmShow={show}>
        <div className="title">
          {showRatingPage
            ? `${selectedUser.nickname}님의 매너점수`
            : "누구와 거래했나요?"}
        </div>
        {showRatingPage ? (
          <div className="rating">
            <StarRatings
              rating={rating}
              starRatedColor={colors.yellow}
              changeRating={changeRating}
              numberOfStars={5}
              starHoverColor={colors.yellow}
              isAggregateRating={true}
              starDimension="30px"
              name="rating"
            />
          </div>
        ) : (
          <div className="user-list">
            {chatList.map((chat, i) => (
              <div
                className="user-item"
                key={i}
                onClick={() => {
                  handleUserClick(i);
                }}
              >
                <div className="image">
                  <img
                    src={chat.image}
                    alt="img"
                    onError={(e) => {
                      e.target.src =
                        "https://karateinthewoodlands.com/wp-content/uploads/2017/09/default-user-image.png";
                    }}
                  />
                </div>
                <div className="nickname">{chat.nickname}</div>
              </div>
            ))}
          </div>
        )}
        <div className="button-container">
          <button
            className="cancel"
            onClick={() => {
              if (showRatingPage) {
                setShowRatingPage(false);
                setRating(3);
                setSelectedUser({});
              } else {
                setSelectedUser({});
                setShowRatingPage(false);
                setRating(3);
                onCancleButtonClick();
              }
            }}
          >
            취소
          </button>
          {showRatingPage ? (
            <button className="complete" onClick={complete}>
              등록
            </button>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
}
