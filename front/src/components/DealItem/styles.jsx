import styled from "styled-components";
import { fonts, colors } from "../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    margin: 25px 0;
    padding: 0 4px;
    .book-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 20px;
      border-radius: 6px;
    }
    .content {
      text-align: left;
      flex-grow: 1;

      .deal-title {
        font-size: ${fonts.md};
        font-weight: 600;
      }
      .book-title {
        font-size: ${fonts.md};
        font-weight: 400;
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
      .detail {
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
        .footer {
          display: flex;
          justify-content: space-between;
          .created {
            color: ${colors.gray};
            font-size: ${fonts.xs};
          }
          .price {
            font-size: ${fonts.lg};
            font-weight: 600;
          }
        }
        /* .heart {
          display: block;
          color: ${colors.gray};
          width: 14px;
          height: 14px;
        }
        .heart-filled {
          display: block;
          color: ${colors.yellow};
          width: 14px;
          height: 14px;
        } */
      }
    }
  }
`;
