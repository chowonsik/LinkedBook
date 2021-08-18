import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Layout/Header";
import { Wrapper, DealList } from "./styles";
import { getBookDeals } from "../../../actions/Books";
import DealListItem from "../../../components/deal/DealListItem";

const BookDeals = ({ match }) => {
  const dispatch = useDispatch();
  const {
    params: { isbn },
  } = match;
  const bookDeals = useSelector((state) => state.bookReducer.bookDeals);
  const areaId = useSelector((state) => state.userReducer.selectedArea.areaId);
  const listHeight = window.innerHeight - 55;

  async function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (parseInt(scrollTop) + parseInt(clientHeight) !== parseInt(scrollHeight))
      return;
    if (bookDeals && bookDeals.length % 10 !== 0) return;
    const page = parseInt(bookDeals.length / 10);
    console.log(isbn);
    await dispatch(getBookDeals(isbn, areaId, page));
  }

  return (
    <>
      <Header isBack title="거래정보" />
      <Wrapper onScroll={handleScroll} height={listHeight}>
        <DealList>
          {bookDeals ? (
            bookDeals.map((dealObj, idx) => (
              <DealListItem key={idx} dealObj={dealObj} />
            ))
          ) : (
            <span className="non-data">
              해당 지역에서의 거래정보가 존재하지 않습니다.
            </span>
          )}
        </DealList>
      </Wrapper>
    </>
  );
};
export default BookDeals;
