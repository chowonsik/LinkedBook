import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  position: absolute;
  left: 10%;
  width: 80%;
  height: 130px;
  background-color: ${colors.lightGray};

  border-radius: 24px;
  display: ${(props) => (props.isActive ? "flex" : "none")};
  transition: 1000ms;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  h3 {
    text-align: center;
    font-size: ${fonts.lg};
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 1024px) {
    top: 0;
  }
  @media screen and (max-width: 1023px) {
    bottom: 0;
  }
  z-index: 2;
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
