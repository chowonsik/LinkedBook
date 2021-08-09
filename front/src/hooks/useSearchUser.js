import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearchUserResult, setUserListReset } from "../actions/Search";
const useSearchUser = () => {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.searchReducer.userList);
  // 돋보기 아이콘 눌렀을 때
  const handleClickSearch = () => {
    setIsActive(true);
  };

  // X 버튼 눌렀을 때
  const handleClickCancle = () => {
    dispatch(setUserListReset());
    setIsActive(false);
    setPage(0);
    setValue("");
  };

  // 입력창의 변화 감지
  const handleChange = (e) => {
    if (value.length === 0) dispatch(setUserListReset());
    setValue(e.target.value);
  };

  // enter 눌렀을 때
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setPage(0);
      dispatch(setUserListReset());
      const params = {
        type: "SEARCH",
        nickname: value,
        page,
        size: 10,
      };
      dispatch(getSearchUserResult(params, page));
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && value.length === 1) {
      dispatch(setUserListReset());
    }
  };

  const handleScroll = (e) => {
    console.log(e.target.scrollTop);
  };
  return {
    value,
    users,
    isActive,
    handleKeyDown,
    handleClickSearch,
    handleScroll,
    handleChange,
    handleKeyPress,
  };
};

export default useSearchUser;
