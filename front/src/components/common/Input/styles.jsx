import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`;

export const StyledInput = styled.input.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder,
  value: props.value,
  onChange: props.onChange,
  autocapitalize: "off",
}))`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "45px"};
  color: ${colors.black};
  background-color: ${colors.lightGray};
  border-radius: 6px;
  font-size: ${(props) => props.fontSize || "18px"};
  outline: none;
  border: none;
  padding: 0 10px;
`;

export const ErrorMessage = styled.div`
  height: ${fonts.xl};
  font-size: ${fonts.sm};
  color: ${colors.red};
`;
