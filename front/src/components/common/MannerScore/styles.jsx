import styled from "styled-components";
import { fonts } from "../../../styles";

export const Wrapper = styled.div`
  & {
    font-size: ${fonts.md};
    font-weight: 400;
    display: flex;
    align-items: center;
    .emoji {
      margin-right: 4px;
    }
    .good {
      color: #706fd3;
    }
    .great {
      color: #34ace0;
    }
    .excellent {
      color: #33d9b2;
    }
  }
`;
