import styled from 'styled-components';

export const Form = styled.form`
  border: 1px solid var(--gray);
  display: flex;
  flex-direction: column;
  outline: none;
  border-radius: var(--brl);
  max-width: 600px;
  position: relative;
  label {
    font-size: 1em;
    margin-bottom: 25px;
  }
  input {
    padding: 1em;
    border: 1px solid var(--gray);
    border-radius: var(--brs);
  }
  fieldset {
    padding: 2em;
    border: none;
    display: flex;
    flex-direction: column;
  }
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--lightgray);
    text-align: right;
    padding: 1em 2em;
    border-radius: 0 0 9px 9px;
  }
`;
