import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteData } from "react-query";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { PagerChanger } from "./PagerChanger";
import { getFilteredPhotos, getTags, PagerGalleryProps } from "./PagerGallery";
import { TagsPanel } from "./TagsPanel";
import { useInfiniteSearch } from "./useInfiniteSearch";

export const InfiniteGallery = (props: PagerGalleryProps) => {
  const { query, pageSize, onPageSizeChange } = props;
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilter("");
  }, [query]);

  // TODO: Handle error and isLoading from usePhotos

  const queryParameters = {
    query,
    page,
  };

  const { data, fetchNextPage } = useInfiniteSearch(queryParameters);
  if (!data) {
    return null;
  }

  const handleNext = async () => {
    await fetchNextPage();
    setPage((value) => value + 1);
  };

  const handleTagClick = (tag: string) => {
    setFilter(tag);
  };

  const photos = getPhotosFromResponse(data);
  const filteredPhotos = getFilteredPhotos(photos, filter);

  const tags = getTags(photos);
  const sortedTags = tags.sort((a, b) => (a > b ? 1 : -1));

  return (
    <Flex direction="column" maxWidth="100vw">
      <TagsPanel px="2" tags={sortedTags} onTagClick={handleTagClick} />
      <PagerChanger
        ml="2"
        alignSelf="flex-end"
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <Flex
        id="infinite-scroll"
        direction="column"
        overflowY="auto"
        height="100vh"
      >
        <InfiniteScroll
          dataLength={photos.length}
          next={handleNext}
          hasMore={true}
          loader={null}
          endMessage={
            <Text fontWeight="bold" textAlign="center">
              No more photos
            </Text>
          }
          scrollableTarget="infinite-scroll"
        >
          <Gallery photos={filteredPhotos} />
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
};

const getPhotosFromResponse = (
  data: InfiniteData<Record<string, any>>
): Basic[] => {
  const photos: Basic[] = [];
  data.pages.forEach((page) => {
    photos.push(...page.response.results);
  });
  return photos;
};
