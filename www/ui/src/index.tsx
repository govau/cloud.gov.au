import "core-js/features/string/ends-with";
import "core-js/features/array/includes";
import "whatwg-fetch";
import * as React from "react";
import { hydrate, render } from "react-dom";

import App from "./App";

const el = document.getElementById("root") as HTMLElement;
if (el.hasChildNodes()) {
  hydrate(<App />, el);
} else {
  render(<App />, el);
}
