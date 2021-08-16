import { Wrapper, StyledInput, ErrorMessage } from "./styles";

function Input({
  type,
  placeholder,
  value,
  onChange,
  isValid,
  errorMessage = "no",
  width,
  height,
  fontSize,
  readonly,
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
          readonly={readonly}
        />
        {errorMessage !== "no" && (
          <ErrorMessage>{isValid ? "" : errorMessage}</ErrorMessage>
        )}
      </Wrapper>
    </>
  );
}

export default Input;