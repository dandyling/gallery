import { Flex } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { Gallery } from "../../components/Gallery";
import { GalleryPager } from "./GalleryPager";
import { useCurrentPageNumber } from "./useCurrentPageNumber";
import { DEFAULT_PAGE_SIZE, useSearch } from "./useSearch";

interface SearchGalleryProps {
  query: string;
}

export const SearchGallery = (props: SearchGalleryProps) => {
  const { query } = props;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const currentPageNumber = useCurrentPageNumber();

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.currentTarget.value));
  };

  const queryParameters = {
    query,
    page: currentPageNumber,
    perPage: pageSize,
  };

  // TODO: Handle error and isLoading from usePhotos
  const { data } = useSearch(queryParameters);

  if (!data) {
    return null;
  }

  return (
    <Flex direction="column" maxWidth="100vw">
      <GalleryPager
        currentPageNumber={currentPageNumber ?? 1}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        totalPages={data?.response.total_pages}
        paddingBottom="1.5"
        paddingX="6"
      />
      <Gallery photos={data.response.results} />
    </Flex>
  );
};
