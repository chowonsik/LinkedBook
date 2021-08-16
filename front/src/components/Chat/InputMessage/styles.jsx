import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  background-color: #e5eaef;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
  .send-icon {
    font-size: 24px;
  }
`;

export const Input = styled.input.attrs((props) => ({
  maxLength: 150,
}))`
  border: none;
  border-radius: 12px;
  background-color: ${colors.lightGray};
  outline: none;
  width: 80%;
  height: 50%;
  padding: 0.5rem;
`;
