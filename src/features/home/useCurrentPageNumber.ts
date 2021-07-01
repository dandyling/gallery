import { useLocation } from "react-router-dom";

export const useCurrentPageNumber = () => {
  const location = useLocation();
  if (!location) {
    return undefined;
  }
  const { pathname } = location;
  const splittedPath = pathname.split("/");
  const pageNumber =
    splittedPath.length > 1 && splittedPath[1] !== ""
      ? parseInt(splittedPath[1])
      : undefined;
  return pageNumber;
};
