import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import * as React from "react";
import { ChangeEvent } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Gallery } from "../../components/Gallery";
import { Header } from "../../components/Header";
import { GalleryPager } from "./GalleryPager";
import { useCurrentPageNumber } from "./useCurrentPageNumber";
import { DEFAULT_PAGE_SIZE, useUnsplashPhotos } from "./usePhoto";

export const Home = () => {
  const [query, setQuery] = useState("Cat");
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const currentPageNumber = useCurrentPageNumber();
  const queryParameters = { query, page: currentPageNumber, perPage: pageSize };

  // TODO: Handle error and isLoading from usePhotos
  const { data } = useUnsplashPhotos(queryParameters);

  if (!data) {
    return null;
  }

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.currentTarget.value));
  };

  return (
    <Box minWidth="100vw" maxWidth="100vw" minHeight="100vh" maxHeight="100vh">
      <Header>
        <Flex width="100%" maxWidth="80ch" px="4">
          <InputGroup>
            <InputLeftElement
              top="1"
              pointerEvents="none"
              color="gray.300"
              children={<Icon as={FaSearch} />}
            />
            <Input
              size="lg"
              placeholder="Search your photos"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          </InputGroup>
        </Flex>
      </Header>
      <Flex
        as="main"
        position="fixed"
        top="16"
        left="0"
        overflowY="scroll"
        justifyContent="center"
        minWidth="100%"
        maxHeight="calc(100% - 4rem)"
      >
        <Flex
          direction="column"
          justifyContent="center"
          width="100%"
          maxWidth="80ch"
          height="100%"
        >
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
      </Flex>
    </Box>
  );
};
