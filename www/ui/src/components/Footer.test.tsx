import * as React from "react";
import * as renderer from "react-test-renderer";
import { MemoryRouter } from "react-router";

import Footer from "./Footer";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
