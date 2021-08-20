import styled from "styled-components";
import { fonts, colors } from "../../styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: -4.5rem;
`;
export const Container = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const ErrorMessage = styled.div`
  margin-bottom: 2.5rem;
  display: ${(props) => (props.error ? "block" : "none")};
  margin-top: 1rem;
  color: ${colors.red};
  font-size: ${fonts.md};
`;
