import styled from "styled-components";
import { fonts, colors } from "../../styles";
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: 0px;
  background-color: white;
  margin-top: 60px;
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input`
  width: 80%;
  height: 40%;
  border-radius: 12px;
  border: none;
  background-color: ${colors.lightGray};
  outline: none;
  padding: 1rem;
  font-size: ${fonts.lg};
  color: ${colors.black};
  font-weight: 500;
`;

export const Icon = styled.div`
  color: ${colors.black};
  font-size: ${fonts.xl};
  margin-left: 1.5rem;
`;

export const ResultContainer = styled.div`
  width: 90%;
  height: 400px;
  overflow: scroll;
`;

export const ErrorMessage = styled.div`
  color: ${colors.red};
  display: ${(props) => (props.isError ? "block" : "none")};
`;
