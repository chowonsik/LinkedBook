import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  & {
    .img-box {
      position: relative;
      height: 270px;
      width: 100%;
    }
    .book-img {
      position: absolute;
      z-index: 1;
      left: 50%;
      transform: translateX(-50%);
      height: 270px;
    }
    .background-img {
      position: absolute;
      width: 100%;
      height: 270px;
      object-fit: cover;
      filter: brightness(0.4);
      opacity: 0.9;
    }
    .book-detail {
      padding: 0 25px;
      margin-top: 20px;

      .book-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        .title {
          font-size: ${fonts.xxl};
        }
        .score {
          margin-right: 20px;
          font-size: ${fonts.md};
          font-weight: 400;
        }
        .bookmark-cnt {
          font-size: ${fonts.md};
          font-weight: 400;
        }
        .icon {
          color: ${colors.yellow};
          margin-right: 4px;
        }
      }
      .price {
        font-size: ${fonts.lg};
        margin-bottom: 4px;
      }
      .publishing-info {
        font-size: ${fonts.md};
        color: ${colors.gray};
        margin-bottom: 15px;
        span::after {
          content: "|";
          margin: 6px;
        }
        span:last-child::after {
          content: "";
        }
      }
      .book-content {
        font-size: ${fonts.sm};
        margin-bottom: 40px;
      }
      .book-comments {
        div:first-child {
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
  }
`;
