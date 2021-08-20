import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  position: absolute;
  width: 100%;
  height: 130%;
  background-color: rgba(89, 89, 89, 0.7);
  z-index: ${(props) => (props.isActive ? 10 : -1)};
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  color: ${colors.black};
  background-color: ${colors.lightGray};
  font-size: ${fonts.md};
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
`;
