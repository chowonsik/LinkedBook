import styled from "styled-components";
import { colors, fonts } from "../../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  img {
    width: 48px;
    height: 48px;
    border-radius: 100px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  flex: 10;
  .nickname {
    font-size: ${fonts.xl};
    font-weight: 500;
  }
  .count-book {
    font-size: ${fonts.sm};
    color: ${colors.gray};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
