import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";

import Link from "./Link";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Link to="/">Home</Link>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
