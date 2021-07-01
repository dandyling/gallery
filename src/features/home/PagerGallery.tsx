import { Flex } from "@chakra-ui/react";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useEffect, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { useSearch } from "../../data/useSearch";
import { ErrorSplash } from "./ErrorSplash";
import { GalleryPager } from "./GalleryPager";
import { PagerChanger, PageSize } from "./PagerChanger";
import { TagsPanel } from "./TagsPanel";
import { useCurrentPageNumber } from "./useCurrentPageNumber";

interface BasicTag {
  type: string;
  title: string;
}

interface SearchBasic extends Basic {
  tags?: BasicTag[];
}

export interface PagerGalleryProps {
  query: string;
  pageSize: PageSize;
  onPageSizeChange(pageSize: PageSize): void;
}

export const PagerGallery = (props: PagerGalleryProps) => {
  const { query, pageSize, onPageSizeChange } = props;
  const [filter, setFilter] = useState("");
  const currentPageNumber = useCurrentPageNumber() ?? 1;

  useEffect(() => {
    setFilter("");
  }, [query, currentPageNumber]);

  const queryParameters = {
    query,
    page: currentPageNumber,
    perPage: pageSize,
  };

  const { data, isError, isLoading } = useSearch(queryParameters);

  const handleTagClick = (tag: string) => {
    setFilter(tag);
  };

  const tags = getTags(data?.response.results);
  const sortedTags = tags.sort((a, b) => (a > b ? 1 : -1));

  const photos = getFilteredPhotos(data?.response.results, filter);

  return (
    <>
      {isError && <ErrorSplash />}
      {!isError && (
        <Flex direction="column" maxWidth="100vw">
          <TagsPanel px="2" tags={sortedTags} onTagClick={handleTagClick} />
          <PagerChanger
            ml="2"
            alignSelf="flex-end"
            pageSize={pageSize}
            onPageSizeChange={onPageSizeChange}
          />
          {isLoading && <LinearProgress color="secondary" />}
          <Gallery photos={photos} />
          <GalleryPager
            alignSelf="center"
            currentPageNumber={currentPageNumber}
            totalPages={data?.response.total_pages ?? 1}
            py="2"
          />
        </Flex>
      )}
    </>
  );
};

export const getTags = (results: Basic[] | undefined): string[] => {
  if (!results) {
    return [];
  }
  const tagsHash: Record<string, number> = {};
  results.forEach((result: SearchBasic) => {
    result.tags?.forEach((tag) => {
      tagsHash[tag.title] = 1;
    });
  });
  const tags = Object.keys(tagsHash);

  return tags;
};

export const getFilteredPhotos = (
  results: Basic[] | undefined,
  filter: string
) => {
  if (!results) {
    return [];
  }
  return filter === ""
    ? results
    : results.filter((result: SearchBasic) => {
        const tagTitles = result.tags?.map((t) => t.title);
        return tagTitles?.includes(filter);
      });
};
