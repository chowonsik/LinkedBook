import styled from "styled-components";

export const Wrapper = styled.div`
  & {
    padding: 25px;
  }
`;

export const DealList = styled.div`
  padding: 5px;
  margin-bottom: 50px;
  height: ${(props) => props.height}px;
  overflow: scroll;
  align-items: center;
`;
