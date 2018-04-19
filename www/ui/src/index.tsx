import "babel-polyfill";
import "whatwg-fetch";
import * as React from "react";
import { hydrate, render } from "react-dom";

import globalStyles from "./globalStyles";
import App from "./App";

globalStyles();

const el = document.getElementById("root") as HTMLElement;
if (el.hasChildNodes()) {
  hydrate(<App />, el);
} else {
  render(<App />, el);
}
