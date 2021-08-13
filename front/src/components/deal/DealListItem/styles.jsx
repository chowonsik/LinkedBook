import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    align-items: center;
    width: 90%;
    height: 90px;
    margin: 20px 0;
    .image-container {
      width: 90px;
      height: 90px;
      border-radius: 6px;
      margin-right: 20px;
      background-color: ${colors.lightGray};
      .book-image {
        width: 90px;
        height: 90px;
        object-fit: cover;
        border-radius: 6px;
      }
    }
    .content {
      text-align: left;
      flex-grow: 1;

      .deal-title {
        font-size: ${fonts.lg};
        font-weight: 600;
      }
      .book-title {
        font-size: ${fonts.md};
        font-weight: 400;
        margin-bottom: 8px;
        .quality {
          display: inline-block;
          text-align: center;
          margin-left: 5px;
          width: 25px;
          height: 17px;
          border-radius: 15px;
          font-size: ${fonts.sm};
          font-weight: 600;
          color: #fff;
          background-color: ${colors.yellow};
        }
      }
      .detail div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .author {
          color: ${colors.gray};
          font-size: ${fonts.xs};
        }
        .author::after {
          content: "|";
          margin: 0 4px;
        }
        .publisher {
          color: ${colors.gray};
          font-size: ${fonts.xs};
        }
        .created {
          color: ${colors.gray};
        }
        .price {
          font-size: ${fonts.xl};
          font-weight: 600;
        }
        .created {
          font-size: ${fonts.xs};
        }
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
        .heart {
          color: ${colors.gray};
        }
        .heart-filled {
          color: ${colors.yellow};
        }
      }
    }
  }
`;
