import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    padding: 30px 15px;
    .book-list {
      padding: 0 15px;
    }
    .book-list-blank {
      font-size: ${fonts.md};
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-bottom: 30px;
  .input-container {
    flex: 9;
    position: relative;
    display: flex;
    align-items: center;

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

export const BookList = styled.div`
  margin-bottom: 50px;
  height: ${(props) => props.height}px;
  overflow: scroll;
  overflow-x: hidden;
  align-items: center;
`;
