import { Image, ImageProps } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { Basic } from "unsplash-js/dist/methods/photos/types";

interface PhotoProps extends ImageProps {
  photo: Basic | null;
}
export const Photo = (props: PhotoProps) => {
  const { photo, ...rest } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  if (!photo) {
    return null;
  }

  return (
    <>
      {!isLoaded && photo.blur_hash && (
        <Blurhash
          hash={photo.blur_hash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      )}
      <Image
        {...rest}
        objectFit="cover"
        srcSet={`${photo?.urls?.regular} 2x`}
        src={photo?.urls?.thumb}
        alt={
          photo.alt_description ?? `Photo by ${photo.user.instagram_username}`
        }
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
};
