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
import { Header } from "../../components/Header";
import { NewPhotosGallery } from "./NewPhotosGallery";
import { SearchGallery } from "./SearchGallery";

export const Home = () => {
  const [query, setQuery] = useState("");

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
          width="100%"
          maxWidth="80ch"
          height="100%"
          justifyContent="center"
        >
          {query ? <SearchGallery query={query} /> : <NewPhotosGallery />}
        </Flex>
      </Flex>
    </Box>
  );
};
