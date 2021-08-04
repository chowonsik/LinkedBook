import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  h3 {
    font-size: ${fonts.xxl};
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
  color: ${colors.black};
  font-size: ${fonts.lg};
`;
