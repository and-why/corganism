import styled, { css } from 'styled-components';

export const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 5em;
  ${(props) =>
    props.padding &&
    css`
      padding: ${props.padding};
    `};
`;
