import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Layout/Header";
import { Wrapper, DealList } from "./styles";
import { getBookDeals, setIsLoading } from "../../../actions/Books";
import DealListItem from "../../../components/deal/DealListItem";
import { useEffect } from "react";

const BookDeals = ({ match }) => {
  const dispatch = useDispatch();
  const {
    params: { isbn },
  } = match;
  const bookDeals = useSelector((state) => state.bookReducer.bookDeals);
  const areaId = useSelector((state) => state.userReducer.selectedArea.areaId);
  const listHeight = window.innerHeight - 55;

  useEffect(() => {
    dispatch(setIsLoading(true));
  });

  async function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    if (bookDeals && bookDeals.length % 10 !== 0) return;
    const page = parseInt(bookDeals.length / 10);
    await dispatch(getBookDeals(isbn, areaId, page));
  }

  return (
    <>
      <Header isBack title="거래정보" />
      <Wrapper onScroll={handleScroll} height={listHeight}>
        <DealList>
          {bookDeals
            ? bookDeals.map((dealObj, idx) => (
                <DealListItem key={idx} dealObj={dealObj} />
              ))
            : ""}
        </DealList>
      </Wrapper>
    </>
  );
};
export default BookDeals;
