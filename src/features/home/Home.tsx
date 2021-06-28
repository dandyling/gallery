import {
  Box,
  Center,
  Container,
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
import { GalleryPager } from "./GalleryPager";
import { Gallery } from "../../components/Gallery";
import { useCurrentPageNumber } from "./useCurrentPageNumber";
import { useUnsplashPhotos } from "./usePhoto";

export const Home = () => {
  const [query, setQuery] = useState("Cat");
  const currentPageNumber = useCurrentPageNumber();
  const queryParameters = { query, page: currentPageNumber };

  // TODO: Handle error and isLoading from usePhotos
  const { data } = useUnsplashPhotos(queryParameters);

  if (!currentPageNumber || !data) {
    return null;
  }
  return (
    <Box minWidth="100vw" maxWidth="100vw" minHeight="100vh" maxHeight="100vh">
      <Header>
        <Container padding="0" maxWidth="container.md">
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
        </Container>
      </Header>
      <Center as="main" position="fixed" top="16" left="0" minWidth="100%">
        <Container padding="0" maxWidth="container.md">
          <Flex direction="column" justifyContent="center" width="100%">
            <GalleryPager
              currentPageNumber={currentPageNumber}
              totalPages={data?.response.total_pages}
            />
            <Gallery photos={data.response.results} />
          </Flex>
        </Container>
      </Center>
    </Box>
  );
};
