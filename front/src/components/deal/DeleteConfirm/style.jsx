import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 100000;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.confirmShow ? 1 : 0)};
  transform: translateX(${(props) => (props.confirmShow ? 0 : "-100%")});
  transition: opacity 0.3s;
`;

export const Modal = styled.div`
  width: 80vw;
  height: auto;
  border-radius: 6px;
  background-color: ${colors.lightGray};
  z-index: 100001;
  position: fixed;
  top: 20%;
  left: 50%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  opacity: ${(props) => (props.confirmShow ? 1 : 0)};
  transform: translateX(${(props) => (props.confirmShow ? "-50%" : "-300%")});
  transition: opacity 0.3s;
  .message-container {
    flex: 1;
    margin-bottom: 50px;
    .message {
      font-size: ${fonts.xl};
    }
  }
  .button-container {
    flex: 1;
    display: flex;
    justify-content: center;
    gap: 10px;
    button {
      flex: 1;
      height: 35px;
      border-radius: 6px;
      background-color: ${colors.lightGray};
      font-size: ${fonts.md};
    }
    .cancel {
      border: 1px solid ${colors.gray};
    }
    .delete {
      background-color: ${colors.yellow};
      color: white;
    }
  }
`;
