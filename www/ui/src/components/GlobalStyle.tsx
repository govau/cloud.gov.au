import { css, createGlobalStyle } from "styled-components";
import styledNormalize from "styled-normalize";

import { theme } from "../theme";

// Necessary for prettier formatting to work.
const globalStyle = css`
  ${styledNormalize};

  body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Helvetica Neue, Arial, sans-serif;
    background-color: ${theme.bgColor};
    color: ${theme.textColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
