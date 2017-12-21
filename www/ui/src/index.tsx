import "whatwg-fetch";
import * as React from "react";
import { hydrate, render } from "react-dom";
import App from "./App";
import "./index.css";

const el = document.getElementById("root") as HTMLElement;
if (el.hasChildNodes()) {
  hydrate(<App />, el);
} else {
  render(<App />, el);
}
