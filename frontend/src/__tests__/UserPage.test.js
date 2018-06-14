import React from "react";
import UserPage from "../containers/UserPage";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<UserPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
