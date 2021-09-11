import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: 0.5em 1em;
  border: 1px solid var(--gray);
  background-color: var(---white);
  cursor: pointer;
  border-radius: var(--brs);
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  &:hover,
  &:active,
  &:focus {
    background-color: var(--gray);
    outline: none;
  }
  ${(props) =>
    props.secondary &&
    css`
      background-color: var(--white);
      border: none;
      color: var(--dark);
      &:hover,
      &:active,
      &:focus {
        background-color: var(--gray);
      }
    `};
  ${(props) =>
    props.dark &&
    css`
      background-color: var(--black);
      border: none;
      color: var(--white);
      &:hover,
      &:active,
      &:focus {
        background-color: var(--dark);
      }
    `};
`;

// export const Button = ({ children, ...props }) => {
//   return <PrimaryButton {...props}>{children}</PrimaryButton>;
// };
