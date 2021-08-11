import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    .modal-overlay {
      width: 100%;
      height: 100vh;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(1.5px);
      -webkit-backdrop-filter: blur(1.5px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      .modal-window {
        z-index: 4;
        width: 80%;
        height: 45%;
        background-color: ${colors.lightGray};
        border-radius: 10px;
        box-shadow: 0 8px 32px 0 rgba(29, 29, 31, 0.37);
        position: relative;
        top: -5%;
        padding: 30px;
        header h5 {
          font-size: ${fonts.xl};
        }
        .star-rating {
          display: flex;
          .star {
            display: block;
            color: ${colors.yellow};
          }
        }
      }
    }
  }
`;
