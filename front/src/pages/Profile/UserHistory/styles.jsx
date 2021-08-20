import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  & {
    padding: 20px;

    h2 {
      font-size: ${fonts.md};
    }
    .user-comments {
      font-weight: 500;
      color: ${colors.black};
      padding: 0 5px;
    }
  }
`;

export const StyledImg = styled.img`
  width: 65px;
  height: 90px;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
`;

export const ImgList = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  height: ${(props) => props.height}px;
  white-space: nowrap;
  overflow: auto;
  margin: 20px 0;
  -ms-overflow-style: none;
`;
