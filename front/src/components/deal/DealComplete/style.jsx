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
  gap: 20px;
  .title {
    font-size: ${fonts.xl};
  }
  .user-list {
    height: 200px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    gap: 15px;
    margin-bottom: 20px;
    .user-item {
      display: flex;
      .image {
        display: flex;
        align-items: center;
        margin-right: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50px;
        }
      }
      .nickname {
        display: flex;
        align-items: center;
        font-size: ${fonts.lg};
      }
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
    .complete {
      background-color: ${colors.yellow};
      color: white;
    }
  }
`;
