import { useQuery } from "react-query";
import { api, DEFAULT_PAGE_SIZE } from "./useSearch";

interface TopicsProps {
  enabled?: boolean;
}

export const useTopics = ({ enabled = true }: TopicsProps) => {
  return useQuery(
    ["topics"],
    async () => {
      const result = await api.topics.list({
        perPage: DEFAULT_PAGE_SIZE,
        page: 1,
      });
      if (result.errors) {
        throw new Error(result.errors.join("\n"));
      }
      return result;
    },
    {
      enabled,
    }
  );
};
