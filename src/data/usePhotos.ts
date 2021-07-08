import { useQuery } from "react-query";
import { api } from "./useSearch";

interface PhotosQuery {
  id: string;
}

export const usePhotos = ({ id }: PhotosQuery) => {
  return useQuery(["photos", id], async () => {
    const result = await api.photos.get({
      photoId: id,
    });
    if (result.errors) {
      throw new Error(result.errors.join("\n"));
    }
    return result;
  });
};
