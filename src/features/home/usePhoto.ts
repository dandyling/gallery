import { useQuery } from "react-query";
import { createApi } from "unsplash-js";

export const api = createApi({
  accessKey: "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b",
});

interface UnsplashPhotosQuery {
  query: string;
  page?: number;
}

export const useUnsplashPhotos = ({ query, page }: UnsplashPhotosQuery) => {
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