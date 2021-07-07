import { Flex, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Photo } from "../../components/Photo";
import { ScreenOverlay } from "../../components/ScreenOverlay";

interface ViewerProps {
  photo: Basic;
  onClose(): void;
}

export const Viewer = (props: ViewerProps) => {
  const { onClose, photo } = props;

  return (
    <ScreenOverlay onClickOverlay={onClose}>
      <Flex
        flexDirection="column"
        position="relative"
        justifyContent="center"
        alignItems="center"
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
            onClick={onClose}
          />
          <Link
            href={`https://unsplash.com/photos/${photo.id}/download?force=true`}
            backgroundColor="transparent"
            color="white"
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
