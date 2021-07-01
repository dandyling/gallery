import { render, screen } from "@testing-library/react";
import { shallow } from "enzyme";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Basic } from "unsplash-js/dist/methods/topics/types";
import { stubbedTopics } from "../../stubs/topics";
import { Categories } from "./Categories";

test("renders the Category header", () => {
  render(
    <BrowserRouter>
      <Categories
        topics={stubbedTopics as Basic[]}
        onClickCategory={() => {}}
      />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Categories/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders the correct number of cover images", () => {
  const { container } = render(
    <BrowserRouter>
      <Categories
        topics={stubbedTopics as Basic[]}
        onClickCategory={() => {}}
      />
    </BrowserRouter>
  );
  const images = container.getElementsByTagName("img");
  expect(images.length).toEqual(3);
});

test("render header if title is passed in", () => {
  const { container } = render(
    <BrowserRouter>
      <Categories
        topics={stubbedTopics.slice(0, 1) as Basic[]}
        onClickCategory={() => {}}
      />
    </BrowserRouter>
  );
  const h3 = container.getElementsByTagName("h3");
  expect(h3.length).toEqual(1);
});

test("doesn't render header if title is not passed in", () => {
  const { container } = render(
    <BrowserRouter>
      <Categories
        topics={stubbedTopics.slice(2) as Basic[]}
        onClickCategory={() => {}}
      />
    </BrowserRouter>
  );
  const h3 = container.getElementsByTagName("h3");
  expect(h3.length).toEqual(0);
});

test("renders correctly", () => {
  const wrapper = shallow(
    <BrowserRouter>
      <Categories
        topics={stubbedTopics as Basic[]}
        onClickCategory={() => {}}
      />
    </BrowserRouter>
  );
  expect(wrapper).toMatchSnapshot();
});
