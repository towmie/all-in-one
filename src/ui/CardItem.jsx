import styled, { css } from "styled-components";

const CardItem = styled.div`
  padding: 1.4rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  ${(props) =>
    props.type === "total-balance" &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 1.6rem;
    `}

  ${(props) =>
    props.type === "chart" &&
    css`
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      & > *:first-child {
        margin-bottom: 1.6rem;
      }

      & .recharts-legend-item-text {
        font-size: 12px;
      }

      & .recharts-pie-label-text {
        font-weight: 600;
      }
    `}
`;

export default CardItem;
