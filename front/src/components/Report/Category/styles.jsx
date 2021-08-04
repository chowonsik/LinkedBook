import styled from "styled-components";
import { fonts, colors } from "../../../styles";
export const Wrapper = styled.div`
  margin-top: 60px;
  color: ${colors.black};
  h3 {
    font-size: ${fonts.xxl};
  }
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding: 1rem;
  .active {
    border: 1px solid ${colors.yellow};
    color: ${colors.yellow};
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  color: ${colors.black};
  background-color: ${colors.lightGray};
  font-size: ${fonts.lg};
  text-align: start;
  margin-bottom: 1rem;
`;
