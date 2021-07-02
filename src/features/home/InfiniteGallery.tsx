import { Flex, Text } from "@chakra-ui/react";
import LinearProgress from "@material-ui/core/LinearProgress";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteData } from "react-query";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { useInfiniteSearch } from "../../data/useInfiniteSearch";
import { ErrorSplash } from "./ErrorSplash";
import * as _ from "lodash";

interface InfiniteGalleryProps {
  query: string;
}

export const InfiniteGallery = (props: InfiniteGalleryProps) => {
  const { query } = props;
  const [page, setPage] = useState(1);

  const queryParameters = {
    query,
    page,
  };

  const { data, isError, fetchNextPage, isLoading } =
    useInfiniteSearch(queryParameters);

  const handleNext = async () => {
    await fetchNextPage();
    setPage((value) => value + 1);
  };

  const photos = getPhotosFromResponse(data);

  return (
    <>
      {isError && <ErrorSplash />}
      {!isError && (
        <Flex direction="column" maxWidth="100vw">
          {isLoading && <LinearProgress color="secondary" />}
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
              <Gallery photos={photos} />
            </InfiniteScroll>
          </Flex>
        </Flex>
      )}
    </>
  );
};

const getPhotosFromResponse = (
  data: InfiniteData<Record<string, any>> | undefined
): Basic[] => {
  if (!data) {
    return [];
  }
  const photos: Basic[] = [];
  data.pages.forEach((page) => {
    photos.push(...page.response.results);
  });
  return photos;
};
