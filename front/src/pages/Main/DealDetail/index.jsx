import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleFill,
  Heart,
  HeartFill,
  InfoCircle,
} from "react-bootstrap-icons";
import MannerScore from "../../../components/common/MannerScore";

import Header from "../../../components/Layout/Header";
import RoundButton from "../../../components/common/Buttons/RoundButton";
import { colors, fonts } from "../../../styles";
import {
  BookInfo,
  DealState,
  Footer,
  ImageContainer,
  ImageWrapper,
  Section,
  UserInfo,
  Wrapper,
} from "./style";
import { useHistory, useParams } from "react-router-dom";
import { request, requestGet } from "../../../api";
import { useDispatch } from "react-redux";
import {
  addLikeDeal,
  deleteLikeDeal,
  doNotRefresh,
} from "../../../actions/Deal";
import { showToast } from "../../../actions/Notification";
import DeleteConfirm from "../../../components/deal/DeleteConfirm";
import { createRoom } from "../../../actions/Chat";
export default function DealDetail() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { dealId } = useParams();
  const [dealData, setDealData] = useState({
    dealImages: [],
  });
  const [confirmShow, setConfirmShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  async function handleChatCreate() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const response = await requestGet("/chat/rooms", { userId: loginUser.id });
    const room = response.result.find(
      (room) => room.deal_id === dealData.dealId
    );
    if (room) {
      history.push(`/chat/room/${room.room_id}`);
    } else {
      dispatch(createRoom(dealId, dealData.userId, history));
    }
  }

  function goLeft() {
    if (selectedIndex === 0) return;
    setSelectedIndex(selectedIndex - 1);
  }
  function goRight() {
    if (selectedIndex === dealData.dealImages.length - 1) return;
    setSelectedIndex(selectedIndex + 1);
  }

  async function fetchData() {
    const response = await requestGet(`/deals/${dealId}`);
    setDealData(response.result);
    console.log(response.result);
  }

  function getLoginUser() {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    return loginUser;
  }

  function priceToString(price) {
    return price ? price.toLocaleString() : 0;
  }

  async function handleDeleteButtonClick() {
    const response = await request("PATCH", `/deals/${dealData.dealId}`, {
      status: "DELETED",
    });
    console.log(response);
    if (response.isSuccess) {
      dispatch(showToast("게시글이 삭제되었습니다."));
      history.goBack();
    } else {
      dispatch(showToast("삭제 실패"));
    }
  }
  function handleCancleButtonClick() {
    setConfirmShow(false);
  }

  function handleModifyButtonClick() {
    history.push({ pathname: "/update/deal", state: { dealData: dealData } });
  }

  useEffect(() => {
    fetchData();
    getLoginUser();
    dispatch(doNotRefresh());
  }, []);

  return (
    <>
      <DeleteConfirm
        confirmShow={confirmShow}
        onCancleButtonClick={handleCancleButtonClick}
        onDeleteButtonClick={handleDeleteButtonClick}
      />
      <Header title="거래 정보" isBack />
      <Wrapper>
        <ImageWrapper>
          <ImageContainer index={selectedIndex}>
            {dealData.dealImages.length === 0 ? (
              <img
                src="https://historyexplorer.si.edu/sites/default/files/book-348.jpg"
                alt="책 이미지"
              />
            ) : (
              ""
            )}
            {dealData.dealImages.map((image, i) => (
              <img
                src={image.imageurl}
                alt="책 이미지"
                key={i}
                onError={(e) =>
                  (e.target.src =
                    "https://historyexplorer.si.edu/sites/default/files/book-348.jpg")
                }
              />
            ))}
          </ImageContainer>
          <div
            className={`left-icon ${
              dealData.dealImages.length === 0 || selectedIndex === 0
                ? "hide"
                : ""
            }`}
            onClick={goLeft}
          >
            <ChevronLeft />
          </div>
          <div
            className={`right-icon ${
              dealData.dealImages.length === 0 ||
              selectedIndex === dealData.dealImages.length - 1
                ? "hide"
                : ""
            }`}
            onClick={goRight}
          >
            <ChevronRight />
          </div>
          <div className="info-icon">
            <InfoCircle />
          </div>
          <div className="circles">
            {dealData.dealImages.map((image, i) =>
              i === selectedIndex ? (
                <div className="circle selected" key={i}>
                  <CircleFill />
                </div>
              ) : (
                <div className="circle" key={i}>
                  <CircleFill />
                </div>
              )
            )}
          </div>
        </ImageWrapper>
        <UserInfo>
          <div className="image-container">
            <img
              src={dealData.userImage}
              alt=""
              onError={(e) => {
                e.target.src =
                  "data:image/jpeg;base64,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";
              }}
            />
          </div>
          <div className="text-container">
            <span className="nickname">{dealData.userNickname}</span>
            <span className="dong">{dealData.userDong}</span>
          </div>
          <div className="score-container">
            <MannerScore
              score={
                dealData.userMannerScore === 0 ? 3 : dealData.userMannerScore
              }
            />
          </div>
        </UserInfo>
        <Section>
          <BookInfo>
            <div className="deal-title">{dealData.dealTitle}</div>
            <div className="deal-price">
              {priceToString(dealData.dealPrice)}원
            </div>
            <div className="book-info">
              <span className="book-title">{dealData.bookTitle}</span>
              <span className="deal-quality">{dealData.dealQuality}</span>
            </div>
            <div className="book-author">저자 : {dealData.bookAuthor}</div>
            <div className="book-publisher">
              출판사 : {dealData.bookPublisher}
            </div>
            <div className="book-price">
              정가 : {priceToString(dealData.bookPrice)}원
            </div>
            <div className="deal-content">{dealData.dealContent}</div>
          </BookInfo>
          <DealState>
            {dealData.userId === getLoginUser().id ? (
              <div className="complete-button">거래 완료</div>
            ) : (
              ""
            )}
            {/* <div className="review-button">거래 후기 남기기</div> */}
            {/* <div className="review-button">후기 작성 완료</div> */}
          </DealState>
        </Section>
      </Wrapper>
      <Footer>
        <div className="icon-container">
          {dealData.isLikeDeal === 1 ? (
            <span
              className="icon"
              onClick={() => {
                setDealData({ ...dealData, isLikeDeal: 0 });
                dispatch(deleteLikeDeal(dealData.dealId));
              }}
            >
              <HeartFill color={colors.yellow} size="24px" />
            </span>
          ) : (
            <span
              className="icon"
              onClick={() => {
                setDealData({ ...dealData, isLikeDeal: 1 });
                dispatch(addLikeDeal(dealData.dealId));
              }}
            >
              <Heart color={colors.yellow} size="24px" />
            </span>
          )}
        </div>
        <div className="button-container">
          {dealData.userId === getLoginUser().id ? (
            <RoundButton
              value="수정하기"
              width="40%"
              fontSize={fonts.xl}
              onClick={handleModifyButtonClick}
            />
          ) : (
            <RoundButton
              value="거래하기"
              width="40%"
              fontSize={fonts.xl}
              onClick={handleChatCreate}
            />
          )}
          {dealData.userId === getLoginUser().id ? (
            <RoundButton
              value="삭제하기"
              width="40%"
              fontSize={fonts.xl}
              backgroundColor={colors.red}
              onClick={() => {
                setConfirmShow(true);
              }}
            />
          ) : (
            <RoundButton
              value="신고하기"
              width="40%"
              fontSize={fonts.xl}
              backgroundColor={colors.red}
            />
          )}
        </div>
      </Footer>
    </>
  );
}
