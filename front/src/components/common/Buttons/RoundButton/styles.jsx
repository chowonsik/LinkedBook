import styled from "styled-components";
import { fonts, colors } from "../../../../styles";

export const Button = styled.button`
  width: ${(props) => props.width || "280px"};
  height: ${(props) => props.height || "48px"};
  border-radius: ${(props) => props.borderRadius || "6px"};
  color: ${colors.white};
  background-color: ${(props) => props.backgroundColor || colors.black};
  font-size: ${(props) => props.fontSize || fonts.xl};
`;
