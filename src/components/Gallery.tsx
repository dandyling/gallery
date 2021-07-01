import { Grid, Image } from "@chakra-ui/react";
import * as React from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
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
            <Image
              objectFit="cover"
              srcSet={`${photo?.urls?.small} 2x`}
              src={photo.urls.thumb}
              alt={
                photo.alt_description ??
                `Photo by ${photo.user.instagram_username}`
              }
            />
          </RatioContainer>
        );
      })}
    </Grid>
  );
};
