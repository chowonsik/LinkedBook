import styled from "styled-components";
import { fonts, colors } from "../../styles";
export const Wrapper = styled.div`
  width: 100%;
`;

export const AlarmType = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

export const AlarmTypeItem = styled.div`
  width: 100%;
  padding: 0.25rem;
  text-align: center;
  color: ${(props) => (props.isType ? colors.black : colors.gray)};
  border-bottom: 1px solid
    ${(props) => (props.isType ? colors.black : colors.lightGray)};
`;
