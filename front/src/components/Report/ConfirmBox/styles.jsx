import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  justify-content: center;
`;

export const MessageBox = styled.div`
  color: ${colors.yellow};
  background-color: ${colors.lightGray};
  font-size: ${fonts.md};
  padding: 0.5rem 1rem;
  border-radius: 12px;
  text-align: center;
`;
