import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: ${fonts.xxl};
  }
  div {
    padding: 1rem;
  }
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 200px;
  border-radius: 6px;
  border: none;
  background-color: ${colors.lightGray};
  padding: 1rem;
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  color: ${colors.black};
  font-size: ${fonts.lg};
  outline: none;
`;
