import { useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Wrapper, ErrorMessage, Container } from "./styles";
import Header from "../../components/Layout/Header";
import FooterButton from "../../components/common/Buttons/FooterButton";
import Category from "../../components/Report/Category";
import ReportContent from "../../components/Report/ReportContent";
import ConfirmBox from "../../components/Report/ConfirmBox";
import Modal from "../../components/Report/Modal";
import { setReport, setReportStatus } from "../../actions/Report";
import { request } from "../../api";
import { useEffect } from "react";

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
        dealId: Number(dealId),
        category,
        content,
      };

      setReport(data);
    }
  };
  return { error, onClick };
};

function Report({ match, setReport }) {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.reportReducer.status);

  useEffect(() => {
    changeModalActive();
  }, [status]);
  const [dealId, setDealId] = useState(match.params.dealId);
  const [isActive, setIsActive] = useState(false);

  const history = useHistory();

  const categoryValidator = (nodeId) => {
    if (nodeId === "spam") {
      return "SPAM";
    } else if (nodeId === "illegal-act") {
      return "ILLEGAL";
    } else if (nodeId === "bad-manners") {
      return "MANNER";
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

  const changeModalActive = () => {
    if (status === 201) {
      setIsActive(true);
      setTimeout(history.goBack, 1500);
    }
    dispatch(setReportStatus(0));
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
    <Wrapper>
      <Modal
        text={"신고가 성공적으로 접수되었습니다."}
        isActive={isActive}
      ></Modal>
      <Header title={"신고하기"} isBack={true} />

      <Container>
        <Category onClick={category.onClick} />
        <ReportContent onChange={text.onChange} value={text.value} />
        <ErrorMessage error={submit.error}>{submit.error}</ErrorMessage>
      </Container>

      <FooterButton value={"신고"} onClick={submit.onClick} />
    </Wrapper>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setReport: (data) => dispatch(setReport(data)),
  };
}
export default connect(null, mapDispatchToProps)(Report);
