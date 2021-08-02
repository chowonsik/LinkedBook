import { StyledInput } from "./styles";

function Input({ value, width, height, fontSize, onChange }) {
  return (
    <>
      <StyledInput
        width={width}
        height={height}
        placeholder={placeholder}
        fontSize={fontSize}
        onChange={onChange}
      />
    </>
  );
}

export default Input;
