import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Basic } from "unsplash-js/dist/methods/topics/types";
import { Header } from "../../components/Header";
import { Categories } from "./Categories";
import { InfiniteGallery } from "./InfiniteGallery";
import { PageSize } from "./PagerChanger";
import { PagerGallery } from "./PagerGallery";
import { useTopics } from "./useTopics";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState<PageSize>(PageSize.All);

  const topics = useTopics();

  const handleClickCategory = (category: string) => {
    return setSearch(category);
  };

  const handlePageSizeChange = (size: PageSize) => {
    setPageSize(size);
  };

  const query =
    search === "" ? getDefaultTopic(topics.data?.response.results) : search;

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
              placeholder="Search for photos here"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
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
          width="100%"
          height="100%"
          maxWidth="80ch"
          justifyContent="center"
        >
          <Categories
            topics={topics.data?.response.results ?? []}
            onClickCategory={handleClickCategory}
            pl="4"
            pb="4"
          />
          {pageSize !== PageSize.All ? (
            <PagerGallery
              query={query}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          ) : (
            <InfiniteGallery
              query={query}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

const getDefaultTopic = (topics: Partial<Basic>[] | undefined): string => {
  return topics ? topics![0].title! : "Wallpapers";
};
