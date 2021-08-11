import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  & {
    .book-comments {
      padding: 0 25px;
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        h4 {
          font-size: ${fonts.xl};
          font-weight: 600;
        }
      }
    }
  }
`;
