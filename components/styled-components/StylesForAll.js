import { css } from 'styled-components';

export default function stylesForAll(props) {
  return css`
    // for all: ;
    ${(props) =>
      props.width &&
      css`
        width: ${props.width};
      `}
    ${(props) =>
      (props.maxWidth || props.maxW) &&
      css`
        width: ${props.maxWidth || props.maxW};
      `}
    ${(props) =>
      props.height &&
      css`
        height: ${props.height};
      `}
  ${(props) =>
      props.margin &&
      css`
        margin: ${props.margin};
      `}
  ${(props) =>
      (props.marginTop || props.mt) &&
      css`
        margin-top: ${props.marginTop || props.mt};
      `}
  ${(props) =>
      (props.marginBottom || props.mb) &&
      css`
        margin-bottom: ${props.marginBottom || props.mb};
      `}
  ${(props) =>
      (props.marginLeft || props.ml) &&
      css`
        margin-left: ${props.marginLeft || props.ml};
      `}
  ${(props) =>
      (props.marginRight || props.mr) &&
      css`
        margin-right: ${props.marginRight || props.mr};
      `}
  ${(props) =>
      props.padding &&
      css`
        padding: ${props.padding};
      `} 
      ${(props) =>
      (props.paddingTop || props.pt) &&
      css`
        margin-top: ${props.paddingTop || props.pt};
      `}
  ${(props) =>
      (props.paddingBottom || props.pb) &&
      css`
        margin-bottom: ${props.paddingBottom || props.pb};
      `}
  ${(props) =>
      (props.paddingLeft || props.pl) &&
      css`
        margin-left: ${props.paddingLeft || props.pl};
      `}
  ${(props) =>
      (props.paddingRight || props.pr) &&
      css`
        margin-right: ${props.paddingRight || props.pr};
      `}
  // flex item options
  ${(props) =>
      props.order &&
      css`
        order: ${props.order};
      `} 
  ${(props) =>
      props.flexGrow &&
      css`
        flex-grow: ${props.flexGrow};
      `} 
  ${(props) =>
      props.flexShrink &&
      css`
        flex-shrink: ${props.flexShrink};
      `} 
  ${(props) =>
      props.flexBasis &&
      css`
        flex-basis: ${props.flexBasis};
      `} 
  ${(props) =>
      props.flex &&
      css`
        flex: ${props.flex};
      `} 
  ${(props) =>
      props.alignSelf &&
      css`
        align-self: ${props.alignSelf};
      `} 
  ${(props) =>
      props.border &&
      css`
        border: ${props.border};
      `} 
  ${(props) =>
      (props.borderRadius || props.br) &&
      css`
        border-radius: ${props.borderRadius || props.br};
      `} 
  ${(props) =>
      props.color &&
      css`
        color: ${props.color};
      `} 
  ${(props) =>
      (props.background || props.bg) &&
      css`
        background: ${props.background || props.bg};
      `} // end for all
  `;
}
