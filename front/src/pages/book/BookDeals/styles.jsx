import styled from "styled-components";

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
