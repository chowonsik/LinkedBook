import styled from "styled-components";

import { colors, fonts } from "../../../styles";
export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: ${fonts.xxl};
  border-top: 1px solid ${colors.lightGray};
  background-color: white;
  .new-post {
    color: ${colors.yellow};
    font-size: 26px;
  }
  .active {
    color: ${colors.yellow};
  }
`;
