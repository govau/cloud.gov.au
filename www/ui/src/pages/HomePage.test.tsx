import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";

import HomePage from "./HomePage";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
