import styled from "styled-components";
import { colors } from "../../../styles";

export const Wrapper = styled.div`
  margin: 60px 0;
  padding: 90px 20px 20px 20px;
`;

export const LocationButton = styled.input.attrs((props) => ({
  type: "text",
  readOnly: true,
  placeholder: props.placeholder,
}))`
  width: 100%;
  height: 45px;
  border-radius: 6px;
  background-color: ${colors.lightGray};
  font-size: ${(props) => props.fontSize || "18px"};
  outline: none;
  border: none;
  padding: 0 10px;
  cursor: pointer;
`;
