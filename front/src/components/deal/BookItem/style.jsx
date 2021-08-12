import styled from "styled-components";
import { colors, fonts } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 15px;
    width: 75px;
    height: 100px;
    img {
      width: 75px;
      height: 100px;
      object-fit: cover;
      border-radius: 6px;
    }
  }
  .info {
    .title {
      font-size: ${fonts.md};
      margin-bottom: 7px;
    }
    .author,
    .publisher,
    .price {
      font-size: ${fonts.xs};
      color: ${colors.gray};
    }
  }
`;
