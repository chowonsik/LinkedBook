import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin: 0 0 60px 0;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);

  .hide {
    display: none;
  }
  .left-icon {
    position: absolute;
    color: white;
    left: 10px;
    font-size: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .right-icon {
    position: absolute;
    color: white;
    font-size: 20px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .info-icon {
    position: absolute;
    bottom: 7px;
    right: 10px;
    color: white;
  }
  .circles {
    position: absolute;
    display: flex;
    gap: 5px;
    font-size: 6px;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.3);
    .selected {
      color: white;
    }
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  transition-property: transform;
  transition-duration: 0.4s;
  transform: translateX(${(props) => `${parseInt(props.index) * -100}%`});

  img {
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
export const Section = styled.section`
  display: flex;
  justify-content: space-between;
`;
export const DealState = styled.div`
  padding: 28px 15px;
  .complete-button {
    border-radius: 100px;
    width: 90px;
    height: 30px;
    border: 1px solid ${colors.black};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }
  .review-button {
    color: ${colors.yellow};
    font-weight: 600;
    font-size: ${fonts.md};
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
    /* display: flex;
    align-items: center;
    gap: 10px; */
    .book-title {
      font-size: ${fonts.lg};
      &::after {
        content: " ";
      }
    }
    .deal-quality {
      border-radius: 100px;
      color: white;
      background-color: ${colors.yellow};
      font-size: ${fonts.sm};
      padding: 1px 7px;
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
  display: flex;
  background-color: white;
  .icon-container {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-container {
    flex: 10;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
