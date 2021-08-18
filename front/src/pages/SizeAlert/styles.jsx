import styled from "styled-components";
import { fonts, colors } from "../../styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;

export const Bar = styled.div`
  margin-top: 3rem;
  height: 10px;
  background-color: ${colors.lightGray};
  width: ${(props) => props.initWidth + "px"};
  max-width: 1600px;
  border-radius: 6px;
  margin: 2rem 2rem;
  transition: all 0.2s;
  position: relative;
`;

export const ProgressBar = styled.div`
  left: 0;
  height: 10px;
  width: ${(props) => props.width + "px"};
  background-color: ${colors.yellow};

  border-radius: 6px;
`;

export const Icon = styled.div`
  position: absolute;
  top: -30px;
  left: ${(props) => props.pos + "px"};
  font-size: 32px;
`;
