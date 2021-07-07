import { Grid } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Photo } from "./Photo";
import { RatioContainer } from "./RatioContainer";
import { Viewer } from "../features/home/Viewer";

interface GalleryProps {
  photos: Basic[];
}

export const Gallery = (props: GalleryProps) => {
  const { photos } = props;
  const [showViewer, setShowViewer] = useState(false);
  const [selected, setSelected] = useState<Basic | null>(null);

  const toggleViewer = () => {
    setShowViewer((value) => !value);
  };

  const handleClick = (photo: Basic) => {
    setSelected(photo);
    toggleViewer();
  };

  return (
    <Grid gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="auto" gridGap="1">
      {photos.map((photo, i) => {
        return (
          <RatioContainer ratio="1 / 1" key={`${i} - ${photo.id}`}>
            <Photo
              cursor="pointer"
              photo={photo}
              onClick={() => handleClick(photo)}
            />
          </RatioContainer>
        );
      })}
      {showViewer && selected && (
        <Viewer photo={selected} onClose={toggleViewer} />
      )}
    </Grid>
  );
};
