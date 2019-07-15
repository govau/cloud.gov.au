import * as styledComponents from "styled-components";
import {
  ThemedStyledComponentsModule,
  StyledFunction
} from "styled-components";

import Theme from "./theme";

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = (styledComponents as ThemedStyledComponentsModule<
  any
>) as ThemedStyledComponentsModule<Theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, StyledFunction };
export default styled;
