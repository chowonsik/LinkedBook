import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 12px;
  margin-top: 0.5rem;
`;

export const Image = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const NickName = styled.div`
  width: 70%;
  margin-left: 1rem;
  h3 {
    font-size: ${fonts.md};
    color: ${colors.black};
  }
`;

export const FollowButton = styled.button`
  display: ${(props) => (!props.isFollow ? "block" : "none")};
  width: 55px;
  height: 30px;
  border: none;
  border-radius: 12px;
  background-color: ${colors.yellow};
  color: #fff;
  font-size: ${fonts.md};
  &:hover {
    cursor: pointer;
  }
`;

export const FollowingButton = styled.button`
  display: ${(props) => (props.isFollow ? "block" : "none")};
  width: 55px;
  height: 30px;
  border: 1px solid ${colors.yellow};
  border-radius: 12px;
  background-color: #fff;
  color: ${colors.yellow};
  font-size: ${fonts.md};
  &:hover {
    cursor: pointer;
  }
`;
