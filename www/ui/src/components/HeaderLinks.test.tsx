import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";

import HeaderLinks from "./HeaderLinks";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <HeaderLinks />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
