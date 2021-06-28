import { useLocation } from "react-router-dom";

export const useCurrentPageNumber = () => {
  const { pathname } = useLocation();
  const splittedPath = pathname.split("/");
  const pageNumber =
    splittedPath.length > 1 ? parseInt(splittedPath[1]) : undefined;
  return pageNumber;
};
