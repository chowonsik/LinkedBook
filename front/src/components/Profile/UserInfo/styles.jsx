import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  & {
    width: 100%;
    height: auto;
    margin-bottom: 12px;
    .profile-content {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      margin-left: 10px;
      .profile-img {
        margin-right: 30px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .profile-info {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-info {
          .user-title {
            display: flex;
            align-items: center;
            vertical-align: middle;
            .username {
              display: flex;
              margin-right: 4px;
              font-size: ${fonts.xl};
              padding-bottom: 2px;
            }
            .user-setting {
              width: 16px;
              height: 16px;
            }
          }
          .user-detail {
            display: flex;
            align-items: center;
            margin-bottom: 2px;
            .location {
              margin-right: 8px;
              font-size: ${fonts.md};
              font-weight: 400;
              color: ${colors.gray};
            }
          }
          .follow-btn {
            .follower {
              width: 80px;
              height: 20px;
              border-radius: 10px;
              background-color: ${colors.yellow};
              color: #fff;
            }
            .following {
              font-weight: 500;
              width: 80px;
              height: 20px;
              border-radius: 10px;
              color: ${colors.yellow};
              background-color: #fff;
              border: 1px solid ${colors.yellow};
            }
          }
        }
        .user-history {
          width: 22px;
          height: 22px;
          color: ${colors.yellow};
        }
      }
    }
    .profile-description {
      width: 100%;
      text-align: left;
      padding: 10px 0;
      font-size: small;
    }
  }
`;
