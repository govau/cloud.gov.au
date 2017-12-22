import * as styledComponents from "styled-components";
import {
  ThemedStyledComponentsModule,
  StyledFunction
} from "styled-components";

import Theme from "./theme";

const {
  default: styled,
  css,
  injectGlobal,
  keyframes,
  ThemeProvider
} = (styledComponents as ThemedStyledComponentsModule<
  any
>) as ThemedStyledComponentsModule<Theme>;

export { css, injectGlobal, keyframes, ThemeProvider, StyledFunction };
export default styled;
