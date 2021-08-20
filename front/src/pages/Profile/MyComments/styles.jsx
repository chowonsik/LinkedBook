import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    padding: 30px 15px;
    height: ${(props) => props.height + "px"};
    overflow-y: scroll;
    h2 {
      font-size: ${fonts.md};
    }
  }
`;
