import styled, { css } from 'styled-components';

export const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  min-height: calc(100vh - 92px);
`;

export const LeftColumn = styled.div`
  width: 100%;
  padding: 5em;
  position: relative;
  order: 1;
  @media (max-width: 601px) {
    order: 2;
  }
  ${(props) =>
    props.background &&
    css`
      background: ${props.background};
    `}
`;

export const RightColumn = styled.div`
  position: relative;
  width: 100%;
  padding: 5em;
  order: 2;
  @media (max-width: 601px) {
    order: 1;
  }
  ${(props) =>
    props.background &&
    css`
      background: ${props.background};
    `}
`;
