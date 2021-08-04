import { useState } from "react";
import { connect } from "react-redux";

import { Wrapper, ErrorMessage } from "./styles";
import Header from "../../components/Layout/Header";
import FooterButton from "../../components/common/Buttons/FooterButton";
import Category from "../../components/Report/Category";
import ReportContent from "../../components/Report/ReportContent";
import { setReport } from "../../actions/Report";

// 신고 항목 선택을 위한 hook
const useSelet = (initValue, validator) => {
  const [value, setValue] = useState(initValue);
  const onClick = (e) => {
    const beforeCategory = document.querySelector(".active");
    const curCategory = e.target;
    if (beforeCategory) {
      beforeCategory.classList.remove("active");
    }
    curCategory.classList.add("active");
    setValue(validator(curCategory.id));
  };
  return { value, onClick };
};

// textarea를 위한 hook
const useText = (initValue, validator, setCommonError) => {
  const [value, setValue] = useState(initValue);
  const [error, setError] = useState("");
  const onChange = (e) => {
    setCommonError("");
    const text = e.target.value;
    const result = validator(text);
    if (result === "good") {
      setValue(text);
      setError("");
    } else if (result === "lack") {
      setValue(text);
      setError("10글자 이상으로 작성해주세요.");
    } else if (result === "over") {
      setError("120글자 이하로 작성해주세요.");
    }
  };
  return { value, error, onChange };
};

function Report({ match, setReport }) {
  const [dealId, setDealId] = useState(match.params.dealId);

  const categoryValidator = (nodeId) => {
    if (nodeId === "spam") {
      return "ADVERTISING";
    } else if (nodeId === "illegal-act") {
      return "ILLEGAL_ACT";
    } else if (nodeId === "bad-manners") {
      return "BAD_MANNERS";
    } else if (nodeId === "etc") {
      return "ETC";
    }
  };

  const textValidator = (text) => {
    if (text.length >= 10 && text.length <= 120) {
      return "good";
    } else if (text.length < 10) {
      return "lack";
    } else if (text.length > 120) {
      return "over";
    }
  };
  function handleClickSubmit() {
    if (category.value === "") {
      setError("신고 항목을 선택해주세요.");
      return;
    }
    if (text.value === "") {
      setError("신고 사유를 입력해주세요.");
      return;
    } else if (text.value.length < 10 || text.value.length > 120) {
      return;
    }
    setError("");

    const data = {
      userId: 5, // 추후 수정
      dealId: Number(dealId),
      category: category.value,
      content: text.value,
    };
    setReport(data);
  }
  const category = useSelet("", categoryValidator);
  const [error, setError] = useState("");
  const text = useText("", textValidator, setError);

  return (
    <>
      <Header title={"신고하기"} isBack={true} />
      <Wrapper>
        <Category onClick={category.onClick} />
        <ReportContent onChange={text.onChange} value={text.value} />
        <ErrorMessage error={text.error}>{text.error}</ErrorMessage>
        <ErrorMessage error={error}>{error}</ErrorMessage>
      </Wrapper>
      <FooterButton value={"신고"} onClick={handleClickSubmit} />
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setReport: (data) => dispatch(setReport(data)),
  };
}
export default connect(null, mapDispatchToProps)(Report);
