import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: var(--text-5xl);
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: var(--text-4xl);
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: var(--text-3xl);
    `}
  ${(props) =>
    props.as === "h4" &&
    css`
      font-size: var(--text-2xl);
    `}
  ${(props) =>
    props.as === "h5" &&
    css`
      font-size: var(--text-xl);
    `}
    ${(props) =>
    props.type === "primary" &&
    css`
      font-size: calc(var(--text-5xl) * 1.5);
      font-weight: 400;
    `}
    ${(props) =>
    props.type === "secondary" &&
    css`
      color: var(--color-grey-0);
      font-weight: 400;
    `}

    ${(props) =>
    props.roi === "positive" &&
    css`
      color: var(--color-green-700);
    `}

    ${(props) =>
    props.roi === "negative" &&
    css`
      color: var(--color-red-800);
    `}
    ${(props) =>
    props.roi === "neutral" &&
    css`
      color: var(--color-grey-700);
    `}
`;

Heading.defaultProps = {
  roi: "neutral",
};

export default Heading;
