import { injectGlobal } from "styled-components";
import styledNormalize from "styled-normalize";

import { theme } from "./theme";

export default () => injectGlobal`
  ${styledNormalize}

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
