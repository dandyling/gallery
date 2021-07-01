import { useQuery } from "react-query";
import { createApi } from "unsplash-js";

export const api = createApi({
  accessKey: "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b",
});

export const DEFAULT_PAGE_SIZE = 20;

export interface SearchQuery {
  query: string;
  page: number;
  perPage?: number;
}

export const useSearch = ({
  query,
  page,
  perPage = DEFAULT_PAGE_SIZE,
}: SearchQuery) => {
  return useQuery(
    ["search", query, page, perPage],
    async () => {
      const result = await api.search.getPhotos({
        query,
        orientation: "landscape",
        perPage,
        page,
      });
      if (result.errors) {
        throw new Error(result.errors.join("\n"));
      }
      return result;
    },
    { keepPreviousData: true }
  );
};
