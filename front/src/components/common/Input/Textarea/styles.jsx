import styled from "styled-components";
import { fonts, colors } from "../../../../styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

export const StyledTextarea = styled.textarea.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder,
  value: props.value,
  onChange: props.onChange,
  rows: props.rows,
  cols: props.cols,
  id: props.id,
}))`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100px"};
  color: ${colors.black};
  background-color: ${colors.lightGray};
  border-radius: 6px;
  font-size: ${(props) => props.fontSize || "16px"};
  outline: none;
  border: none;
  resize: none;
  padding: 7px 14px;
`;

export const ErrorMessage = styled.span`
  height: ${fonts.xl};
  font-size: ${fonts.sm};
  color: ${colors.red};
`;
