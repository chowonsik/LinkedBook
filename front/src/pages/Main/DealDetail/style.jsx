import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin: 60px 0;
`;
export const Image = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const UserInfo = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px 0 20px;
    height: 100%;
    flex: 1;
    img {
      width: 45px;
      height: 45px;
      border-radius: 100px;
    }
  }
  .text-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 9;
    .nickname {
      font-size: ${fonts.xl};
    }
    .dong {
      font-size: ${fonts.sm};
      color: ${colors.gray};
    }
  }
  .score-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 24px;
    flex: 1;
  }
`;

export const BookInfo = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  .deal-title {
    font-size: 22px;
    font-weight: 600;
  }
  .deal-price {
    font-size: ${fonts.xxl};
    margin-bottom: 14px;
  }
  .book-info {
    margin-bottom: 7px;
    .book-title {
      font-size: ${fonts.lg};
    }
  }
  .book-author {
    font-size: ${fonts.md};
    color: ${colors.gray};
  }
  .book-publisher {
    font-size: ${fonts.md};
    color: ${colors.gray};
  }
  .book-price {
    font-size: ${fonts.md};
    color: ${colors.gray};
  }
`;

export const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
