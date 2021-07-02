import { Grid } from "@chakra-ui/react";
import * as React from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Photo } from "./Photo";
import { RatioContainer } from "./RatioContainer";

interface GalleryProps {
  photos: Basic[];
}

export const Gallery = (props: GalleryProps) => {
  const { photos } = props;

  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="auto" gridGap="1">
      {photos.map((photo, i) => {
        return (
          <RatioContainer ratio="1 / 1" key={`${i} - ${photo.id}`}>
            <Photo photo={photo} />
          </RatioContainer>
        );
      })}
    </Grid>
  );
};
