import { Wrapper, TextArea } from "./styles";
function ReportContent({ value, onChange }) {
  return (
    <>
      <Wrapper>
        <h3>신고 사유입력</h3>
        <TextArea
          placeholder={"신고 사유에 대한 상세 내용을 입력해 주세요."}
          onChange={onChange}
          value={value}
        />
      </Wrapper>
    </>
  );
}

export default ReportContent;
