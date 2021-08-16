import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  .img-container {
    img {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      object-fit: cover;
    }
  }
  .message {
    max-width: 60%;
    background-color: ${colors.lightGray};
    word-break: break-all;
    padding: 5px 10px;
    border-top-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .createdAt {
    display: flex;
    align-items: flex-end;
    font-size: ${fonts.sm};
    color: ${colors.gray};
  }
`;
