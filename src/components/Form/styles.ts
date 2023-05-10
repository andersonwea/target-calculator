import styled from 'styled-components'

export const HomeForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 0.5rem;

  input {
    background: transparent;
    border: 1px solid #4db5ff;
    padding: 0.5rem;

    border-radius: 0.5rem;
    width: 100%;
  }

  button {
    background: #4db5ff;
    color: #1f1f38;
    font-size: 1rem;
    margin-bottom: 0.5rem;

    padding: 0.5rem 1.5rem;
    border: none;
    cursor: pointer;

    border-radius: 0.5rem;
    max-width: max-content;

    align-self: center;

    transition: all 0.25s ease;

    &:hover {
      background: ${(props) => props.theme.white};
      color: ${(props) => props.theme['bg-color']};
    }
  }
`

export const Error = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`
