import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  .message {
    color: ${colors.gray};
    border-bottom: 0.5px solid;
    border-color: rgba(132, 146, 166, 0.5);
    font-size: ${fonts.md};
    margin-bottom: 10px;
  }
  .icon-container {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  }
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
  }
  .google {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

export const KaKaoButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #fee500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
