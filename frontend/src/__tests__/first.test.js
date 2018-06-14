import React from "react";
import AdminList from "../containers/AdminList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<AdminList />).toJSON();
  expect(tree).toMatchSnapshot();
});
