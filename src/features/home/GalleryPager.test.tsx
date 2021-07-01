import { getAdjacentPages } from "./GalleryPager";

test("returns page numbers less than 2 correctly", () => {
  expect(getAdjacentPages(1, 200)).toEqual([1, 2, 3]);
});

test("returns page numbers in normal range correctly", () => {
  expect(getAdjacentPages(3, 200)).toEqual([2, 3, 4]);
});

test("returns page numbers if current page is last page correctly", () => {
  expect(getAdjacentPages(200, 200)).toEqual([198, 199, 200]);
});

test("returns empty array if invalid input", () => {
  expect(getAdjacentPages(-1, 200)).toEqual([]);
});
