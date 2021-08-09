import { Wrapper, StyledInput, ErrorMessage } from "./styles";

function Input({
  type,
  placeholder,
  value,
  onChange,
  onClick,
  isValid,
  errorMessage = "no",
  width,
  height,
  fontSize,
  id,
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
          id={id}
          onClick={onClick}
        />
        {errorMessage !== "no" && (
          <ErrorMessage>{isValid ? "" : errorMessage}</ErrorMessage>
        )}
      </Wrapper>
    </>
  );
}

export default Input;
