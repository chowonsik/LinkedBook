import styled from "styled-components";
import { colors } from "../../../../styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  .text {
    margin-bottom: 10px;
  }
`;

export const Spinner = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 6px solid ${colors.yellow};
  border-top-color: transparent;
  animation: spinner 0.8s ease-in infinite;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
