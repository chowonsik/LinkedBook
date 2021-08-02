import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "45px"};
  color: ${colors.black};
  background-color: ${colors.lightGray};
  border-radius: 6px;
  font-size: ${(props) => props.fontSize || "18px"};
`;
