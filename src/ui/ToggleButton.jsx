import styled from "styled-components";

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus,
  &:active {
    border: none;
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;
export default ToggleButton;
