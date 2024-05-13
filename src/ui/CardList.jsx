import styled from "styled-components";

export const Cardlist = styled.ul`
  margin-top: 1.6rem;
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: auto auto;
  gap: 2.4rem;
  margin-bottom: 3.2rem;
`;
