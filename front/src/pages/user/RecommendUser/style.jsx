import styled from "styled-components";
import { fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin-bottom: 60px;
  padding: 35px 20px 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: ${fonts.xxl};
    font-weight: 400;
  }
  h2 {
    font-size: ${fonts.lg};
    margin-bottom: 20px;
    font-weight: 400;
  }
`;
