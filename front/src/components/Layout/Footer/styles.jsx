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
`;

export const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  padding: 0.5rem;
  p {
    color: ${colors.black};
    font-size: 12px;
  }
  div {
  }
`;

export const NewPostBtn = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.yellow};

  &:hover {
    cursor: pointer;
  }
  p {
    color: white;
    font-size: 42px;
    margin-bottom: 0.2rem;
  }
`;
