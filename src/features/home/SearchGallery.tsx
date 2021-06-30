import { Flex, Tag, TagLabel } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { GalleryPager } from "./GalleryPager";
import { useCurrentPageNumber } from "./useCurrentPageNumber";
import { DEFAULT_PAGE_SIZE, useSearch } from "./useSearch";

interface SearchGalleryProps {
  query: string;
}

interface BasicTag {
  type: string;
  title: string;
}
interface SearchBasic extends Basic {
  tags?: BasicTag[];
}

export const SearchGallery = (props: SearchGalleryProps) => {
  const { query } = props;
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [filter, setFilter] = useState("");
  const currentPageNumber = useCurrentPageNumber();

  useEffect(() => {
    setFilter("");
  }, [query, currentPageNumber]);

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

  const tags = getTags(data.response.results);
  const sortedTags = tags.sort((a, b) => (a > b ? 1 : -1));

  const photos = getFilteredPhotos(data.response.results, filter);

  return (
    <Flex direction="column" maxWidth="100vw">
      <Flex px="2" overflowX="scroll">
        {sortedTags.map((tag) => {
          return (
            <Tag whiteSpace="nowrap" minWidth="auto" size="md" mx="1">
              <TagLabel onClick={() => setFilter(tag)}>{tag}</TagLabel>
            </Tag>
          );
        })}
      </Flex>
      <GalleryPager
        currentPageNumber={currentPageNumber ?? 1}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        totalPages={data?.response.total_pages}
        paddingBottom="1.5"
        paddingX="6"
      />
      <Gallery photos={photos} />
    </Flex>
  );
};

const getTags = (results: Basic[]): string[] => {
  const tagsHash: Record<string, number> = {};
  results.forEach((result: SearchBasic) => {
    result.tags?.forEach((tag) => {
      tagsHash[tag.title] = 1;
    });
  });
  const tags = Object.keys(tagsHash);

  return tags;
};

const getFilteredPhotos = (results: Basic[], filter: string) => {
  return filter === ""
    ? results
    : results.filter((result: SearchBasic) => {
        const tagTitles = result.tags?.map((t) => t.title);
        return tagTitles?.includes(filter);
      });
};
