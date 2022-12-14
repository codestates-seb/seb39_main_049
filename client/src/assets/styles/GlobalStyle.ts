import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  :root {
    font-family: -apple-system,"Noto Sans KR",sans-serif;
    font-weight: 500;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: revert;
    font-weight: 700;
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  ol, ul, li {
    list-style: none;
  }
  a {
    text-decoration: none;
    &:link,
    &:visited {
      color: inherit;
    }
  }
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
