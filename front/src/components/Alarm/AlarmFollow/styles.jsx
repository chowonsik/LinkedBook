import styled from "styled-components";
import { fonts, colors } from "../../../styles";

export const Wrapper = styled.div`
  width: 100%;
  height: ${(props) => props.height + "px"};
  overflow-y: scroll;
  margin-top: 1rem;
`;
