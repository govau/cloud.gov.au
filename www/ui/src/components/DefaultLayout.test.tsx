import * as React from "react";
import * as renderer from "react-test-renderer";

import DefaultLayout from "./DefaultLayout";

it("renders without crashing", () => {
  const tree = renderer.create(<DefaultLayout>content</DefaultLayout>).toJSON();
  expect(tree).toMatchSnapshot();
});
