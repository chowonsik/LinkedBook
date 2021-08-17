import { Wrapper, StyledTextarea, ErrorMessage } from "./styles";

function Textarea({
  type,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage = "no",
  width,
  height,
  fontSize,
  rows,
  cols,
  id,
}) {
  return (
    <Wrapper>
      <StyledTextarea
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        width={width}
        height={height}
        fontSize={fontSize}
        rows={rows}
        cols={cols}
        id={id}
      />
      {errorMessage !== "no" && (
        <ErrorMessage>{isValid ? "" : errorMessage}</ErrorMessage>
      )}
    </Wrapper>
  );
}

export default Textarea;
