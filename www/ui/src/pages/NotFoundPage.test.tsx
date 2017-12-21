import * as React from "react";
import * as renderer from "react-test-renderer";

import NotFoundPage from "./NotFoundPage";

it("renders without crashing", () => {
  const tree = renderer.create(<NotFoundPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
