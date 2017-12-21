import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";

import Header from "./Header";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
