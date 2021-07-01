import { render } from "@testing-library/react";
import React from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { stubbedPhotos } from "../stubs/photos";
import { Gallery } from "./Gallery";

test("renders the number of images correctly", () => {
  const { container } = render(<Gallery photos={stubbedPhotos as Basic[]} />);
  const images = container.getElementsByTagName("img");
  expect(images.length).toEqual(4);
});
