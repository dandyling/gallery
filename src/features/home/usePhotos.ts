import { useQuery } from "react-query";
import { api, DEFAULT_PAGE_SIZE } from "./useSearch";

interface PhotosQuery {
  page?: number;
  perPage?: number;
}

export const usePhotos = ({
  page,
  perPage = DEFAULT_PAGE_SIZE,
}: PhotosQuery) => {
  return useQuery(["photos", page, perPage], async () => {
    const result = await api.photos.list({
      perPage,
      page,
    });
    if (result.errors) {
      throw new Error(result.errors.join("\n"));
    }
    return result;
  });
};
