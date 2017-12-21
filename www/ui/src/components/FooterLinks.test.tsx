import * as React from "react";
import { MemoryRouter } from "react-router";
import * as renderer from "react-test-renderer";

import FooterLinks from "./FooterLinks";

it("renders without crashing", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <FooterLinks />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
