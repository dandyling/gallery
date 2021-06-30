import { Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { InfiniteData } from "react-query";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { usePhotos } from "./usePhotos";

export const NewPhotosGallery = () => {
  const [page, setPage] = useState(1);

  // TODO: Handle error and isLoading from usePhotos
  const { data, fetchNextPage } = usePhotos({
    page,
  });

  const handleNext = async () => {
    await fetchNextPage();
    setPage((value) => value + 1);
  };

  if (!data) {
    return null;
  }

  const photos = getPhotosFromResponse(data);

  return (
    <Flex
      id="infinite-scroll"
      direction="column"
      maxWidth="100vw"
      overflowY="auto"
      height="100vh"
    >
      <InfiniteScroll
        dataLength={photos.length}
        next={handleNext}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <Text textAlign="center">
            <b>No more photos</b>
          </Text>
        }
        scrollableTarget="infinite-scroll"
      >
        <Heading as="h2" fontSize="xl" py="2" px="2">
          Discover photos from everywhere
        </Heading>
        <Gallery photos={photos} />
      </InfiniteScroll>
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
