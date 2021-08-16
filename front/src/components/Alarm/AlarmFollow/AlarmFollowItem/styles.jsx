import styled from "styled-components";
import { fonts, colors } from "../../../../styles";
export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
`;

export const Content = styled.div`
  width: 60%;
  font-size: ${fonts.lg};
  span {
    font-size: 12px;
    color: ${colors.gray};
    margin-left: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const CheckButton = styled.button`
  width: 55px;
  height: 20px;
  background-color: ${colors.yellow};
  color: ${colors.white};
  border: none;
  border-radius: 12px;
  font-size: 12px;
  line-height: 10px;
  margin-right: 0.5rem;
`;

export const CancleButton = styled.button`
  width: 55px;
  height: 20px;
  background-color: ${colors.white};
  color: ${colors.yellow};
  border: 1px solid ${colors.yellow};
  border-radius: 12px;
  font-size: 12px;
  line-height: 10px;
`;
