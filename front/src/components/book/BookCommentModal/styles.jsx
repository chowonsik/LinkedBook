import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    .modal-overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(1.5px);
      -webkit-backdrop-filter: blur(1.5px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      .modal-window {
        z-index: 4;
        width: 80%;
        background-color: ${colors.lightGray};
        border-radius: 10px;
        box-shadow: 0 8px 32px 0 rgba(29, 29, 31, 0.37);
        position: relative;
        top: -5%;
        padding: 30px;
        .title {
          font-size: ${fonts.xl};
          margin-bottom: 12px;
        }
        .category-list {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 15px;
          li {
            padding: 2px 3px;
            margin: 5px;
            font-size: 11px;
            height: 16px;
            color: ${colors.gray};
            border: solid 1 ${colors.lightGray};
            border-radius: 10px;
            background-color: #fff;
          }
          .selected {
            color: ${colors.black};
            font-weight: 500;
          }
        }
        .star-rating {
          display: flex;
          justify-content: center;
          margin-bottom: 15px;
          .star {
            display: block;
            color: ${colors.yellow};
            font-size: 30px;
            margin-right: 6px;
          }
        }
        footer {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }
        .complete {
          background-color: ${colors.yellow};
          color: #fff;
          padding: 3px 6px;
          border-radius: 6px;
          font-size: ${fonts.md};
        }
        .cancel {
          background-color: #fff;
          padding: 3px 6px;
          border-radius: 6px;
          font-size: ${fonts.md};
        }
      }
    }
  }
`;

export const StyledTextarea = styled.textarea`
  padding: 6px;
  width: 100%;
  height: 100px;
  outline: none;
  border: solid 0.1px ${colors.gray};
  background-color: #fff;
  border-radius: 6px;
  margin-bottom: 15px;
  resize: none;
`;
