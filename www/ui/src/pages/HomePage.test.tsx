import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";

import HomePage from "./HomePage";
import { theme } from "../theme";
import { ThemeProvider } from "styled-components";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
