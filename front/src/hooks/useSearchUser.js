import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSearchUserResult, setUserListReset } from "../actions/Search";
const useSearchUser = () => {
  const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.searchReducer.currentPage);
  const totalPages = useSelector((state) => state.searchReducer.totalPages);
  const users = useSelector((state) => state.searchReducer.userList);

  // 돋보기 아이콘 눌렀을 때
  const handleClickSearch = () => {
    setFlag(true);
    dispatch(setUserListReset());
    const params = {
      type: "SEARCH",
      nickname: value,
      page: 0,
      size: 15,
    };
    dispatch(getSearchUserResult(params));
  };

  // 입력창의 변화 감지
  const handleChange = (e) => {
    if (value.length === 0) dispatch(setUserListReset());
    setValue(e.target.value);
  };

  // enter 눌렀을 때
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setFlag(true);
      dispatch(setUserListReset());
      const params = {
        type: "SEARCH",
        nickname: value,
        page: 0,
        size: 15,
      };
      dispatch(getSearchUserResult(params));
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8 && value.length === 1) {
      dispatch(setUserListReset());
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
      if (currentPage < totalPages) {
        const params = {
          type: "SEARCH",
          nickname: value,
          page: currentPage + 1,
          size: 7,
        };
        dispatch(getSearchUserResult(params));
      }
    }
  };

  return {
    value,
    users,
    isActive,
    flag,
    handleKeyDown,
    handleClickSearch,
    handleScroll,
    handleChange,
    handleKeyPress,
  };
};

export default useSearchUser;
