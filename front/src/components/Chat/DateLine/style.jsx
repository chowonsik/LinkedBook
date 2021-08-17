import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  .date-string {
    font-size: 13px;
    flex: 1;
    text-align: center;
  }
  .line {
    flex: 1;
    border-bottom: 1px solid ${colors.black};
    transform: scaleY(0.5);
  }
`;
