import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
`;

export const Content = styled.div`
  background-color: ${colors.lightGray};
  height: 130px;
  width: 90%;
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  padding: 8px 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  .title {
    font-size: ${fonts.md};
    font-weight: 600;
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .image {
    img {
      width: 65px;
      height: 72px;
      object-fit: cover;
    }
  }
`;
export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 67%;
  .score {
    display: flex;
    gap: 12px;
    font-size: ${fonts.md};
    .item {
      display: flex;
      gap: 5px;
      .icon {
        color: ${colors.yellow};
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .tags {
    color: ${colors.gray};
    font-size: ${fonts.lg};
    span {
      margin-right: 5px;
    }
  }
  .reviews {
    display: flex;
    font-size: ${fonts.md};
    ul {
      width: 100%;
      li {
        display: block;
        gap: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .circle {
          font-size: 6px;
          margin-right: 5px;
        }
      }
    }
  }
`;
