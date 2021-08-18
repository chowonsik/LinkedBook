import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 50px 0;
    margin-bottom: 100px;
    .user-image {
      display: flex;
      flex-direction: column;
      align-self: center;
      margin-bottom: 20px;
      img {
        margin-bottom: 10px;
        width: 120px;
        height: 120px;
        border-radius: 60px;
        object-fit: cover;
        align-self: center;
      }
      label {
        align-self: center;
        font-size: ${fonts.md};
        color: ${colors.gray};
      }
      input[type="file"] {
        /* 파일 필드 숨기기 */
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
      }
    }
    label {
      margin-bottom: 6px;
      font-size: ${fonts.lg};
      color: ${colors.gray};
    }
    .change-password {
      margin-bottom: 18px;
      font-size: ${fonts.md};
      color: ${colors.yellow};
    }
    .manage-account {
      display: flex;
      .delete-account {
        padding: 2px;
        font-size: ${fonts.md};
        color: ${colors.gray};
        margin-right: 14px;
      }
      .logout {
        padding: 2px;
        font-size: ${fonts.md};
        color: ${colors.gray};
      }
    }
  }
`;
