import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  position: fixed;
  bottom: ${(props) => (props.isActive ? "0px" : "-200px")};
  transition: all 1000ms;
  margin-right: auto;
  margin-left: auto;
`;

export const Container = styled.div`
  height: 130px;
  background-color: ${colors.lightGray};
  z-index: 2;
  border-radius: 24px;
  transition: 1000ms;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  h3 {
    text-align: center;
    font-size: ${fonts.lg};
    margin-bottom: 1rem;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CancleButton = styled.button`
  border: 1px solid ${colors.gray};
  color: ${colors.gray};
  width: 60px;
  height: 30px;
  border-radius: 24px;
  font-size: ${fonts.md};
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;

export const CheckButton = styled.button`
  border: none;
  background-color: ${colors.yellow};
  color: #fff;
  width: 60px;
  height: 30px;
  border-radius: 24px;
  font-size: ${fonts.md};
  &:hover {
    cursor: pointer;
  }
`;
