import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  .createdAt {
    display: flex;
    align-items: flex-end;
    margin-right: 10px;
    font-size: ${fonts.sm};
    color: ${colors.gray};
  }
  .message {
    max-width: 60%;
    background-color: ${colors.yellow};
    color: white;
    word-break: break-all;
    padding: 5px 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
