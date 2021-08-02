import { Wrapper, StyledInput, ErrorMessage } from "./styles";

function Input({
  type,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage,
  width,
  height,
  fontSize,
}) {
  return (
    <>
      <Wrapper>
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          width={width}
          height={height}
          fontSize={fontSize}
        />
        <ErrorMessage>{isValid ? "" : errorMessage}</ErrorMessage>
      </Wrapper>
    </>
  );
}

export default Input;
