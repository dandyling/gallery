import {
  AspectRatio,
  Box,
  Center,
  ChakraProvider,
  Container,
  Flex,
  Grid,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  theme,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b",
});

const queryClient = new QueryClient();

const usePhotos = (query: string) => {
  return useQuery(["photos", query], async () => {
    const result = await api.search.getPhotos({
      query,
      orientation: "landscape",
      perPage: 20,
    });
    if (result.errors) {
      throw new Error(result.errors.join("\n"));
    }
    return result;
  });
};

interface GalleryProps {
  query: string;
}

const Gallery = (props: GalleryProps) => {
  const { query } = props;
  // TODO: Handle error and isLoading from usePhotos
  const { data } = usePhotos(query);
  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="auto" gridGap="1">
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
  );
};

export const App = () => {
  const [query, setQuery] = useState("Cat");
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box
          minWidth="100vw"
          maxWidth="100vw"
          minHeight="100vh"
          maxHeight="100vh"
        >
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
      </ChakraProvider>
    </QueryClientProvider>
  );
};
