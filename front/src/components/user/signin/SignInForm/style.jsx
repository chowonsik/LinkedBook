import styled from "styled-components";
import { colors, fonts } from "../../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  .sign-up-message {
    display: flex;
    justify-content: space-between;
    font-size: ${fonts.md};
    margin-top: 10px;
    .message {
      color: ${colors.gray};
    }
  }
`;
