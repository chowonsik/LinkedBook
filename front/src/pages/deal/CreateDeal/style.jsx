import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin: 60px 0;
  padding: 15px 24px;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
  .input-container {
    flex: 9;
    position: relative;
    display: flex;
    align-items: center;

    .search-list {
      background-color: ${colors.lightGray};
      display: flex;
      flex-direction: column;
      padding: 20px;
      max-height: 330px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      position: absolute;
      width: 100%;
      top: 39px;
      gap: 16px;
      z-index: 99;
      border-radius: 6px;
    }
    input {
      width: 100%;
      height: 45px;
      padding: 0 40px 0 16px;
      outline: none;
      border: none;
      background-color: ${colors.lightGray};
      border-radius: 6px;
    }
    .search-icon {
      font-size: 18px;
      position: absolute;
      right: 10px;
    }
  }
  .barcode-icon {
    flex: 1;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const BookInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 6px;
  flex-direction: column;
  .title {
    font-size: ${fonts.md};
  }
  .author-publisher {
    font-size: ${fonts.xs};
    color: ${colors.gray};
  }
`;

export const ImageContainer = styled.div`
  margin-top: 32px;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  padding-bottom: 2px;
  -webkit-overflow-scrolling: touch;
  .box {
    display: inline-block;
    width: 80px;
    height: 80px;
    background-color: ${colors.lightGray};
    margin-right: 18px;
    position: relative;
    &:last-child {
      margin-right: 0;
    }
  }
  .image {
    &:first-child::before {
      content: "대표 이미지";
      position: absolute;
      font-size: ${fonts.md};
      color: white;
      background-color: ${colors.yellow};
      padding: 2px 2px;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      object-fit: cover;
    }
    .delete {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 0;
      right: 5px;
      font-size: ${fonts.xl};
    }
  }
  .add-button {
    position: relative;
    input {
      display: none;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
    }
  }
`;

export const QualityContainer = styled.div`
  display: flex;
  margin-top: 32px;
  flex-direction: column;
  .title {
    font-size: ${fonts.md};
  }
  .quality-container {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    .round-box {
      cursor: pointer;
      height: 26px;
      width: 24%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      border: 1px solid ${colors.gray};
      color: ${colors.gray};
      &.selected {
        background-color: ${colors.yellow};
        border: none;
        color: ${colors.white};
      }
    }
  }
`;

export const TextContainer = styled.div`
  margin-top: 20px;
  input {
    width: 100%;
    height: 45px;
    padding: 0 40px 0 16px;
    outline: none;
    border: none;
    background-color: ${colors.lightGray};
    border-radius: 6px;
  }
  .low-high {
    color: ${colors.gray};
    font-size: ${fonts.md};
    margin-top: 16px;
    margin-bottom: 4px;
  }
  textarea {
    margin-top: 40px;
    width: 100%;
    height: 150px;
    padding: 16px;
    outline: none;
    border: none;
    background-color: ${colors.lightGray};
    border-radius: 6px;
    resize: none;
  }
`;
