import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Wrapper, ErrorMessage } from "./styles";
import Header from "../../components/Layout/Header";
import FooterButton from "../../components/common/Buttons/FooterButton";
import Category from "../../components/Report/Category";
import ReportContent from "../../components/Report/ReportContent";
import ConfirmBox from "../../components/Report/ConfirmBox";
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
const useText = (initValue, validator) => {
  const [value, setValue] = useState(initValue);
  const onChange = (e) => {
    const text = e.target.value;
    const result = validator(text);
    if (result === "good" || result === "lack") {
      setValue(text);
    }
  };
  return { value, onChange };
};

const useSubmit = (userId, dealId, category, content, setReport, history) => {
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(false);
  const onClick = () => {
    if (category === "") {
      setError("신고 항목을 선택해주세요.");
    } else if (content.length === 0) {
      setError("신고 사유를 입력해주세요.");
    } else if (content.length < 10) {
      setError("신고 사유를 10글자 이상 작성해주세요.");
    } else {
      setError("");
      const data = {
        userId,
        dealId: Number(dealId),
        category,
        content,
      };

      setReport(data, history);
      setIsActive(true);
    }
  };

  return { error, onClick, isActive };
};
function Report({ match, setReport }) {
  const [dealId, setDealId] = useState(match.params.dealId);
  const history = useHistory();
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

  const category = useSelet("", categoryValidator);
  const text = useText("", textValidator);
  const submit = useSubmit(
    5,
    dealId,
    category.value,
    text.value,
    setReport,
    history
  );

  return (
    <>
      <Header title={"신고하기"} isBack={true} />
      <Wrapper>
        <Category onClick={category.onClick} />
        <ReportContent onChange={text.onChange} value={text.value} />
        <ErrorMessage error={submit.error}>{submit.error}</ErrorMessage>
        <ConfirmBox
          text={"신고가 성공적으로 접수되었습니다."}
          isActive={submit.isActive}
        />
      </Wrapper>
      <FooterButton value={"신고"} onClick={submit.onClick} />
    </>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setReport: (data, history) => dispatch(setReport(data, history)),
  };
}
export default connect(null, mapDispatchToProps)(Report);
