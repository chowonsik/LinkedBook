import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    margin-bottom: 22px;
    .user-img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 25px;
      margin-right: 15px;
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
        align-items: center;
        .star-rating {
          color: ${colors.yellow};
          height: auto;
          margin-right: 7px;
          svg {
            width: 12px;
            margin-right: 1px;
          }
        }
        span {
          font-size: ${fonts.xs};
          color: ${colors.gray};
          padding-bottom: 2px;
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
        }
      }
    }
  }
`;
