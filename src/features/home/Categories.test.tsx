import { render } from "@testing-library/react";
import React from "react";
import { Basic } from "unsplash-js/dist/methods/topics/types";
import { stubbedTopics } from "../../stubs/topics";
import { Categories } from "./Categories";
import { screen } from "@testing-library/react";
import { shallow } from "enzyme";

test("renders the Category header", () => {
  render(
    <Categories topics={stubbedTopics as Basic[]} onClickCategory={() => {}} />
  );
  const linkElement = screen.getByText(/Categories/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the correct number cover images", () => {
  const { container } = render(
    <Categories topics={stubbedTopics as Basic[]} onClickCategory={() => {}} />
  );
  const images = container.getElementsByTagName("img");
  expect(images.length).toEqual(3);
});

test("render header if title is passed in", () => {
  const { container } = render(
    <Categories
      topics={stubbedTopics.slice(0, 1) as Basic[]}
      onClickCategory={() => {}}
    />
  );
  const h3 = container.getElementsByTagName("h3");
  expect(h3.length).toEqual(1);
});

test("doesn't render header if title is not passed in", () => {
  const { container } = render(
    <Categories
      topics={stubbedTopics.slice(2) as Basic[]}
      onClickCategory={() => {}}
    />
  );
  const h3 = container.getElementsByTagName("h3");
  expect(h3.length).toEqual(0);
});

test("renders correctly", () => {
  const wrapper = shallow(
    <Categories topics={stubbedTopics as Basic[]} onClickCategory={() => {}} />
  );
  expect(wrapper).toMatchSnapshot();
});
