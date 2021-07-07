import {
  Box,
  Flex,
  Heading,
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
import { useTopics } from "../../data/useTopics";
import { InfiniteGallery } from "./InfiniteGallery";

export const Home = () => {
  const [search, setSearch] = useState("");

  const topics = useTopics();
  const query = getQuery(search)(topics.data?.response.results);

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
              placeholder="Search for photos"
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
          <Heading
            px="2"
            pb="1"
            as="h1"
            fontSize="2xl"
            textAlign="center"
            fontWeight="normal"
          >
            Download beautiful wallpapers for free here
          </Heading>
          <InfiniteGallery query={query} />
        </Flex>
      </Flex>
    </Box>
  );
};

function getQuery(search: string) {
  return function getDefaultTopic(topics: Partial<Basic>[] | undefined) {
    const defaultSearch = topics ? topics![0].title! : "Wallpapers";
    return search === "" ? defaultSearch : search;
  };
}
