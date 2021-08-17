import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  position: fixed;
  bottom: ${(props) => (props.toastShow ? "70px" : "-60px")};
  opacity: ${(props) => (props.toastShow ? "1" : "0")};
  width: 100vw;
  display: flex;
  justify-content: center;
  transition: all 0.5s;
`;

export const Message = styled.div`
  padding: 15px 12px;
  display: flex;
  align-items: center;
  background-color: #212123;
  color: #bebebf;
  color: ${colors.white};

  border-radius: 4px;
  width: 95vw;
  word-break: break-all;
  font-size: ${fonts.md};
  font-weight: 200;
`;
