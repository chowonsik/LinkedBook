import styled from "styled-components";
import { fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin: 60px 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: ${fonts.xxl};
    margin-bottom: 10px;
  }
  h2 {
    font-size: ${fonts.lg};
    margin-bottom: 20px;
  }
`;
