import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  border: none;
  border-bottom: 1px solid ${colors.lightGray};
  padding: 8px 12px;
  background-color: white;
  z-index: 5;
`;

export const BackButton = styled.div`
  width: 20px;
  .back-btn {
    display: ${(props) => (props.isBack ? "block" : "none")};
    font-size: ${fonts.xxl};
  }
`;

export const LogoAndTitle = styled.div`
  width: 130px;
  text-align: center;
  margin-left: 16px;

  .title {
    display: ${(props) => (props.isTitle ? "block" : "none")};
  }
  .logo {
    display: ${(props) => (props.isLogo && !props.isTitle ? "block" : "none")};
    width: 130px;
    height: 40px;
  }
`;

export const IconsAndDone = styled.div`
  width: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .search-btn {
    display: ${(props) => (props.isSearch ? "block" : "none")};
    margin-left: 8px;
    font-size: ${fonts.xl};
  }

  .alarm-btn {
    display: ${(props) => (props.isAlarm ? "block" : "none")};
    margin-left: 8px;
    font-size: ${fonts.xl};
  }

  .declare {
    display: ${(props) => (props.isDeclare ? "block" : "none")};
    margin-left: 8px;
    font-size: ${fonts.xl};
  }

  .done-btn {
    display: ${(props) => (props.isDone ? "block" : "none")};
    margin-left: 8px;
  }
`;

export const DoneButton = styled.button`
  background-color: rgba(255, 255, 255, 0);
  color: ${colors.yellow};
  font-size: ${fonts.xl};
  border: none;
`;
