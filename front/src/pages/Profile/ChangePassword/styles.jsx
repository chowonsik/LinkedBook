import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    padding: 30px 50px 0;
    Header {
      display: block;
    }

    input {
      margin-bottom: 10px;
    }
    label {
      display: block;
      margin-bottom: 6px;
      font-size: ${fonts.lg};
      color: ${colors.gray};
    }
  }
`;
