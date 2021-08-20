import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    margin: 0 0 40px;
    cursor: pointer;
    .book-image {
      width: auto;
      height: 90px;
      object-fit: cover;
      margin-right: 20px;
      border-radius: 6px;
    }
    .content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      text-align: left;
      .book-info {
        .book-title {
          font-size: ${fonts.md};
          font-weight: 600;
        }
        .author {
          color: ${colors.gray};
          font-size: ${fonts.sm};
        }
        .author::after {
          content: "|";
          margin: 0 4px;
        }
        .publisher {
          color: ${colors.gray};
          font-size: ${fonts.sm};
        }
      }
    }
    .price {
      font-size: ${fonts.md};
      font-weight: 600;
    }
  }
`;
