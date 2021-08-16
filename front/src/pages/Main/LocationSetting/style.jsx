import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin: 60px 0;
  padding: 100px 100px 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .container {
    position: relative;
    height: 45px;
    width: 100%;
    min-width: 212px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fonts.xxl};
    border: 1px solid ${colors.gray};
    border-radius: 6px;
    color: ${colors.gray};
    .name-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 8;
      height: 100%;
      .name {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
    .hide {
      display: none;
    }
  }
  .location {
    .icon {
      flex: 2;
    }
  }
  .add-button {
  }
  .selected {
    background-color: ${colors.yellow};
    color: ${colors.white};
    border: none;
  }
`;
