import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  margin: 0 0 60px 0;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ChatRoom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 80px;
  gap: 15px;
  .user-img-container {
    img {
      height: 50px;
      width: 50px;
      object-fit: cover;
      border-radius: 60px;
    }
  }
  .chat-info-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    .nickname {
      font-size: ${fonts.lg};
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message {
      width: 100%;
      font-size: ${fonts.md};
      color: ${colors.gray};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      font-size: ${fonts.sm};
      color: #595959;
      text-align: end;
    }
  }
  .book-img-container {
    display: flex;
    height: 100%;
    align-items: center;
    img {
      width: 60px;
      height: 70px;
      object-fit: cover;
      border-radius: 6px;
    }
  }
`;
