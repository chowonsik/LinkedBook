import styled from "styled-components";
import { colors, fonts } from "../../styles";

export const Wrapper = styled.div`
  margin: 60px 0;
  padding: 10px 20px;
`;

export const LocationContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  .location {
    font-size: ${fonts.xxl};
    margin-right: 10px;
  }
  .icon {
    font-size: ${fonts.xl};
    display: flex;
    align-items: center;
  }
`;
export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
export const SortByList = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const SortButton = styled.button`
  background-color: ${(props) => (props.selected ? colors.yellow : "white")};
  color: ${(props) => (props.selected ? colors.white : colors.gray)};
  border: ${(props) => (props.selected ? "" : "1px solid")};
  border-color: ${(props) => (props.selected ? "" : colors.gray)};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  padding: 0 10px;
  border-radius: 100px;
`;
