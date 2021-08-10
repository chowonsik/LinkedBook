import styled from "styled-components";
import { fonts, colors } from "../../../styles";
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }
  .profile-icon {
    font-size: 46px;
    margin-right: 1rem;
    color: ${colors.gray};
  }
  h3 {
    font-size: ${fonts.md};
    color: ${colors.black};
    font-weight: 500;
  }
`;
