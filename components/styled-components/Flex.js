import styled, { css } from 'styled-components';
import stylesForAll from './StylesForAll';

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  ${(props) => stylesForAll(props)}
  ${(props) =>
    (props.direction || props.flexDirection) &&
    css`
      flex-direction: ${props.direction || props.flexDirection};
    `}
    ${(props) =>
    (props.wrap || props.flexWrap) &&
    css`
      flex-wrap: ${props.wrap || props.flexWrap};
    `}
      ${(props) =>
    (props.flow || props.flexFlow) &&
    css`
      flex-flow: ${props.flow || props.flexFlow};
    `}
  ${(props) =>
    props.alignContent &&
    css`
      align-content: ${props.alignContent};
    `}
  ${(props) =>
    (props.align || props.alignItems) &&
    css`
      align-items: ${props.align || props.alignItems};
    `}
  ${(props) =>
    (props.justify || props.justifyContent) &&
    css`
      justify-content: ${props.justify || props.justifyContent};
    `}
`;
