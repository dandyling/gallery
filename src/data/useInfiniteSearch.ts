import { useInfiniteQuery } from "react-query";
import { api, DEFAULT_PAGE_SIZE, SearchQuery } from "./useSearch";

export const useInfiniteSearch = ({
  query,
  page,
  perPage = 30,
  enabled = true,
}: SearchQuery) => {
  return useInfiniteQuery(
    ["infinite", query],
    async ({ pageParam }) => {
      const result = await api.search.getPhotos({
        query,
        orientation: "landscape",
        perPage,
        page: pageParam,
      });
      if (result.errors) {
        throw new Error(result.errors.join("\n"));
      }
      return result;
    },
    {
      getNextPageParam: () => page + 1,
      enabled,
    }
  );
};
