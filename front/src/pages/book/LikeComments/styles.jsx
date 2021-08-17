import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
