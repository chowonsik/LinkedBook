import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  dt {
    font-size: ${fonts.sm};
    color: ${colors.gray};
  }
  dd {
    font-size: ${fonts.lg};
    font-weight: 300;
  }
  .user-activity {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    text-align: center;
  }
`;
