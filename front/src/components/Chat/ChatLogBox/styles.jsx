import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  justify-content: ${(props) => (props.userType ? "flex-end" : "flex-start")};
  .profile-icon {
    font-size: 46px;
    color: ${colors.gray};
  }
  overflow-y: scroll;
`;

export const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.userType ? "flex-end" : "flex-start")};
  margin: 0 0.5rem;
`;

export const UserName = styled.h3`
  font-size: ${fonts.xl};
`;

export const Message = styled.div`
  width: 50%;
  background-color: ${colors.lightGray};
  width: auto;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
`;
