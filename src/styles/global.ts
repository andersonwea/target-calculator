import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  color: ${(props) => props.theme.white};
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: ${(props) => props.theme['bg-color']};
}
`
