import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { GalleryPager } from "./GalleryPager";
import { PagerChanger, PageSize } from "./PagerChanger";
import { TagsPanel } from "./TagsPanel";
import { useCurrentPageNumber } from "./useCurrentPageNumber";
import { useSearch } from "./useSearch";

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

  // TODO: Handle error and isLoading from usePhotos
  const queryParameters = {
    query,
    page: currentPageNumber,
    perPage: pageSize,
  };

  const { data } = useSearch(queryParameters);
  if (!data) {
    return null;
  }

  const handleTagClick = (tag: string) => {
    setFilter(tag);
  };

  const tags = getTags(data.response.results);
  const sortedTags = tags.sort((a, b) => (a > b ? 1 : -1));

  const photos = getFilteredPhotos(data.response.results, filter);

  return (
    <Flex direction="column" maxWidth="100vw">
      <TagsPanel px="2" tags={sortedTags} onTagClick={handleTagClick} />
      <PagerChanger
        ml="2"
        alignSelf="flex-end"
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <Gallery photos={photos} />
      <GalleryPager
        alignSelf="center"
        currentPageNumber={currentPageNumber ?? 1}
        totalPages={data?.response.total_pages}
        py="2"
      />
    </Flex>
  );
};

export const getTags = (results: Basic[]): string[] => {
  const tagsHash: Record<string, number> = {};
  results.forEach((result: SearchBasic) => {
    result.tags?.forEach((tag) => {
      tagsHash[tag.title] = 1;
    });
  });
  const tags = Object.keys(tagsHash);

  return tags;
};

export const getFilteredPhotos = (results: Basic[], filter: string) => {
  return filter === ""
    ? results
    : results.filter((result: SearchBasic) => {
        const tagTitles = result.tags?.map((t) => t.title);
        return tagTitles?.includes(filter);
      });
};
