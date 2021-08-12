import styled from "styled-components";
import { colors, fonts } from "../../styles";

export const Wrapper = styled.div`
  margin: 0 0 60px 0;
  padding: 10px 0;
`;

export const DealList = styled.div`
  margin-top: 10px;
  height: ${(props) => props.height}px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LocationContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 0 20px;
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
  padding: 0 20px;
`;
export const SortByList = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0 20px;
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

export const SpinnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;
export const Spinner = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 6px solid ${colors.yellow};
  border-top-color: transparent;
  animation: spinner 0.8s ease-in infinite;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
