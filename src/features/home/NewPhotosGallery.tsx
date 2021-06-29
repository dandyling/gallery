import React from "react";
import { Gallery } from "../../components/Gallery";
import { usePhotos } from "./usePhotos";

export const NewPhotosGallery = () => {
  const { data } = usePhotos({ page: 1 });

  if (!data) {
    return null;
  }

  return <Gallery photos={data.response.results} />;
};
