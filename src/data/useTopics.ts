import { useQuery } from "react-query";
import { api, DEFAULT_PAGE_SIZE } from "./useSearch";

export const useTopics = () => {
  return useQuery(["topics"], async () => {
    const result = await api.topics.list({
      perPage: DEFAULT_PAGE_SIZE,
      page: 1,
    });
    if (result.errors) {
      throw new Error(result.errors.join("\n"));
    }
    return result;
  });
};
