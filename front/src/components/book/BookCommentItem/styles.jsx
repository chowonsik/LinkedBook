import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    margin-bottom: 22px;
    .user-img {
      margin: 5px 15px 0 5px;
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 25px;
    }
    .content {
      font-size: ${fonts.md};
      flex-grow: 1;

      .header {
        display: flex;
        justify-content: space-between;
        .username {
          font-size: ${fonts.sm};
          font-weight: 600;
        }
        .update-btn {
          font-size: ${fonts.xs};
        }
        .update-btn::after {
          content: " ";
          margin: 0 4px;
        }
        .delete-btn {
          color: ${colors.red};
          font-size: ${fonts.xs};
        }
      }
      .book-evaluation {
        display: flex;
        .star-rating {
          color: ${colors.yellow};
          height: auto;
          margin-right: 7px;
          svg {
            width: 12px;
            margin-right: 1px;
          }
        }
      }
      .comment-category-list {
        display: flex;
        font-size: ${fonts.xs};
        color: ${colors.gray};
        li {
          margin-right: 4px;
        }
      }
      .book-comment {
        display: flex;
        justify-content: space-between;
        .comment-info {
          display: flex;
          .comment {
            .created-time {
              display: inline-block;
              margin-left: 4px;
              padding-top: 4px;
              font-size: ${fonts.xs};
              color: ${colors.gray};
            }
          }
        }
        .like {
          display: flex;
          align-items: flex-end;
          font-size: ${fonts.sm};
          .like-cnt {
            margin-left: 10px;
            margin-right: 4px;
          }
          .heart-icon {
            color: ${colors.gray};
            margin-bottom: 1px;
          }
          .heart-fill-icon {
            color: ${colors.yellow};
            margin-bottom: 1px;
          }
        }
      }
    }
  }
`;
