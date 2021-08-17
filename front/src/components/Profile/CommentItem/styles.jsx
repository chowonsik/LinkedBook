import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    padding: 0 30px;
    margin-bottom: 20px;
    .book-img {
      width: 45px;
      height: 65px;
      border-radius: 6px;
      margin-right: 20px;
    }
    .comment-content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .category-list {
        display: flex;
        font-size: 10px;
        color: ${colors.gray};
        li {
          margin-right: 4px;
        }
      }
      .comment {
        font-size: 13px;
        font-weight: 500;
      }
      .score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        margin-bottom: 2px;

        .stars {
          .star {
            color: ${colors.yellow};
            margin-right: 1px;
          }
        }
        .created-time {
          font-size: 10px;
          color: ${colors.gray};
          font-weight: 400;
        }
      }
      .footer {
        display: flex;
        justify-content: space-between;
        margin: 0;
        font-size: 12px;
        color: ${colors.gray};
        font-weight: 500;
        .book-title {
          font-weight: 400;
        }
        .like {
          display: flex;
          align-items: center;
          color: ${colors.black};
          .comment-like-cnt {
            margin-right: 3px;
          }
          .heart-fill-icon {
            margin-top: 2px;
            color: ${colors.yellow};
            font-size: 12px;
          }
          .heart-icon {
            margin-top: 2px;
            color: ${colors.gray};
            font-size: 12px;
          }
        }
      }
    }
  }
`;
