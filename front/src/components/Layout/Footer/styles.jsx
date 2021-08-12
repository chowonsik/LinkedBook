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

  border-top: 1px solid ${colors.lightGray};
  background-color: #fff;
  .new-post {
    color: ${colors.yellow};
    font-size: 36px;
  }
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  p {
    color: ${colors.black};
    font-size: 12px;
  }
`;
