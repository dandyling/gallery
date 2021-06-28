import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { createApi } from "unsplash-js";

export const api = createApi({
  accessKey: "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b",
});

export const usePhotos = (query: string) => {
  const { pathname } = useLocation();
  const pagePath = pathname.split("/")[1];
  const page = parseInt(pagePath);
  return useQuery(["photos", query, page], async () => {
    const result = await api.search.getPhotos({
      query,
      orientation: "landscape",
      perPage: 20,
      page,
    });
    if (result.errors) {
      throw new Error(result.errors.join("\n"));
    }
    return result;
  });
};
