import "whatwg-fetch";
import * as React from "react";
import { render } from "react-snapshot";
import App from "./App";
import "./index.css";

render(<App />, document.getElementById("root") as HTMLElement);
