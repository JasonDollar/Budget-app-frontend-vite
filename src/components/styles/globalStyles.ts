import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  p {
    margin: 0;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    /* font-family: 'Urbanist', sans-serif; */
    font-size: 1.6rem;
    color: ${props => props.theme.textColor};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .desktopContainer {
    max-width: 114rem;
    margin: 0 auto;
  }

  .margin-r-l {
    margin: 0 1.5rem;
  }

  .no-margin {
    margin: 0;
  }

  .onlyMobile {
    @media (min-width: 576px) {
      display: none !important;
    }
  }
`