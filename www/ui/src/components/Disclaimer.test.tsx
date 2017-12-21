import * as React from "react";
import * as renderer from "react-test-renderer";

import Disclaimer from "./Disclaimer";

it("renders without crashing", () => {
  const tree = renderer.create(<Disclaimer />).toJSON();
  expect(tree).toMatchSnapshot();
});
