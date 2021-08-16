import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 55px;
`;

export const Container = styled.div`
  height: ${(props) => props.height}px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 15px;
  padding: 15px 10px;
  overflow: auto;
`;
