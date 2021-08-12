import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  .tabs {
    display: flex;
    justify-content: space-around;
    width: 100%;
    border-bottom: 1px solid #e5eaef;
    font-size: ${fonts.md};
  }
  li {
    display: flex;
    justify-content: center;
    padding-bottom: 4px;
    width: 100px;
  }
  .active {
    font-weight: 500;
    border-bottom: 2px solid ${colors.yellow};
  }
`;
