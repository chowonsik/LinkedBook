import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  & {
    width: 100%;
    height: 100%;
    margin-bottom: 60px;
    .book-comments-container {
      padding: 0 25px;
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        h4 {
          font-size: ${fonts.xl};
          font-weight: 600;
        }
      }
    }
  }
`;

export const BookComments = styled.ul``;

export const Footer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  width: 100%;
  height: 60px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  .bookmark-icon {
    font-size: 22px;
    color: ${colors.yellow};
    margin-left: 10px;
  }
  .button-container {
  }
`;
