import {
  AspectRatio,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";
import { usePhotos } from "./usePhoto";

interface GalleryProps {
  query: string;
}

const PAGER_LIMIT = 6;

const Gallery = (props: GalleryProps) => {
  const { query } = props;
  // TODO: Handle error and isLoading from usePhotos
  const { data } = usePhotos(query);
  const total = data?.response.total_pages;
  const pageNumbers =
    total ?? 0 > PAGER_LIMIT
      ? [...Array(PAGER_LIMIT).keys()]
      : [...Array(total).keys()];

  return (
    <Flex direction="column" justifyContent="center" width="100%">
      <Flex paddingBottom="1.5" paddingX="2" alignItems="center" marginX="auto">
        <IconButton
          backgroundColor="transparent"
          size="xs"
          aria-label="Previous page"
          icon={<FaAngleLeft />}
        />
        {pageNumbers.map((p) => {
          return (
            <Link
              as={ReactRouterLink}
              to={String(p + 1)}
              key={String(p + 1)}
              display="flex"
              justifyContent="center"
              alignItems="center"
              minWidth="8"
              minHeight="8"
              maxWidth="8"
              maxHeight="8"
              backgroundColor="transparent"
              _hover={{
                textDecoration: "none",
                backgroundColor: "blue.100",
                borderRadius: "8",
                color: "cyan.700",
              }}
              _focus={{
                textDecoration: "none",
                backgroundColor: "blue.100",
                borderRadius: "8",
                color: "cyan.700",
              }}
            >
              {p + 1}
            </Link>
          );
        })}
        <IconButton
          backgroundColor="transparent"
          size="xs"
          aria-label="Next page"
          icon={<FaAngleRight />}
        />
      </Flex>
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="auto"
        gridGap="1"
      >
        {data?.response?.results.map((photo) => {
          return (
            <AspectRatio ratio={1} key={photo.id}>
              <Image
                src={photo.urls.thumb}
                alt={photo.alt_description ?? `Photo by ${photo.user}`}
              />
            </AspectRatio>
          );
        })}
      </Grid>
    </Flex>
  );
};

export const Home = () => {
  const [query, setQuery] = useState("Cat");
  return (
    <Box minWidth="100vw" maxWidth="100vw" minHeight="100vh" maxHeight="100vh">
      <Flex
        as="header"
        position="fixed"
        top="0"
        left="0"
        justifyContent="center"
        alignItems="center"
        minWidth="100%"
        height="16"
        px="4"
      >
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
      </Flex>
      <Center as="main" position="fixed" top="16" left="0" minWidth="100%">
        <Container padding="0" maxWidth="container.md">
          <Gallery query={query} />
        </Container>
      </Center>
    </Box>
  );
};
