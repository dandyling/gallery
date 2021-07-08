import { Flex, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import { Photo } from "../../components/Photo";
import { ScreenOverlay } from "../../components/ScreenOverlay";
import { useInfiniteSearch } from "../../data/useInfiniteSearch";
import { getQuery } from "./Home";
import { getPhotosFromResponse } from "./InfiniteGallery";

interface ViewerProps {
  search: string;
  page: number;
}

interface ViewerURLParams {
  id: string;
}

export const Viewer = (props: ViewerProps) => {
  const { search, page } = props;
  const params = useParams<ViewerURLParams>();
  const { id } = params;

  const history = useHistory();

  const query = getQuery(search)();

  const queryParameters = {
    query,
    page,
    enabled: false,
  };

  const { data } = useInfiniteSearch(queryParameters);
  const photos = getPhotosFromResponse(data);
  const index = photos.findIndex((p) => p.id === id);
  const photo = photos[index];
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < photos.length - 1) {
        const nextId = photos[index + 1].id;
        history.push(`/photo/${nextId}`);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        const nextId = photos[index - 1].id;
        history.push(`/photo/${nextId}`);
      }
    },
    trackMouse: true,
  });

  const handleHome = () => {
    history.push("/");
  };

  return (
    <ScreenOverlay>
      <Flex
        flexDirection="column"
        position="relative"
        justifyContent="center"
        alignItems="center"
        width="100%"
        {...swipeHandlers}
      >
        <Flex
          padding="1"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          position="absolute"
          top="0"
          left="0"
        >
          <IconButton
            backgroundColor="transparent"
            aria-label="back"
            color="white"
            size="lg"
            icon={<FaArrowLeft />}
            onClick={handleHome}
          />
          <Link
            href={`https://unsplash.com/photos/${id}/download?force=true`}
            backgroundColor="transparent"
            color="white"
            download
            target="_blank"
            rel="nofollow"
            title="Download photo"
            mr="4"
          >
            Download
          </Link>
        </Flex>
        <Flex
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <Photo photo={photo} />
        </Flex>
      </Flex>
    </ScreenOverlay>
  );
};
