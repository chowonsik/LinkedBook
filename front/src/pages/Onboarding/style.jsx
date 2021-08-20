import styled from "styled-components";
import { colors } from "../../styles";
import Slider from "react-slick";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  img {
    width: 120px;
  }
`;

export const Content = styled.div`
  flex: 8;
  .item {
    height: 70vh;
    .container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 4;
        img {
          width: 90%;
          height: auto;
        }
      }
      .text-container {
        flex: 1;
        padding: 0 10%;
        font-size: 20px;
      }
    }
  }
`;

export const Footer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: ${colors.yellow};
    padding: 10px 0;
    width: 80%;
    border-radius: 6px;
    color: white;
    transform: translateY(-20px);
    font-size: 18px;
  }
`;
