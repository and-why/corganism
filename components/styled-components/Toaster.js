import { useState } from 'react';
import styled, { css } from 'styled-components';
import CheckMark from '../icons/check';
import { Button } from './Button';

export const ToasterStyle = styled.div`
  position: fixed;
  bottom: -200px;
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  border-left: green 10px solid;
  background: white;
  box-shadow: var(--bs);
  padding: 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s ease;
  .flex {
    display: flex;
    align-items: center;
  }
  svg {
    height: 30px;
    width: 30px;
    margin-right: 20px;
  }
  header {
    font-size: 1.2em;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .close {
    font-size: 2em;
    padding: 5px;
  }
  ${(props) =>
    props.display &&
    css`
      transform: translateY(-250px);
      transition: transform 0.2s ease;
    `}
`;

export default function Toaster({ heading, content, display, setShowToaster }) {
  const handleClose = () => {
    setShowToaster(false);
  };
  return (
    <ToasterStyle display={display}>
      <div className='flex'>
        <CheckMark />
        <div>
          <header>{heading}!</header>
          <p>{content}</p>
        </div>
      </div>
      <Button secondary className='close' onClick={handleClose}>
        &times;
      </Button>
    </ToasterStyle>
  );
}
