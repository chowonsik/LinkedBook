import styled from "styled-components";
import { colors, fonts } from "../../../../styles";

export const Button = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  color: ${colors.white};
  background-color: ${(props) => props.backgroundColor || colors.black};
  font-size: ${fonts.xl};
`;
