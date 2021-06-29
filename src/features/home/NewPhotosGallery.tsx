import React, { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteData } from "react-query";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { Gallery } from "../../components/Gallery";
import { usePhotos } from "./usePhotos";

export const NewPhotosGallery = () => {
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);

  // TODO: Handle error and isLoading from usePhotos
  const { data, error, fetchNextPage } = usePhotos({
    page,
  });

  const handleObserver = useCallback(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      await fetchNextPage();
      setPage((value) => value + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  if (!data) {
    return null;
  }

  const photos = getPhotosFromResponse(data);

  return (
    <>
      <Gallery photos={photos} />
      <div ref={loader} />
    </>
  );
};

const getPhotosFromResponse = (
  data: InfiniteData<Record<string, any>>
): Basic[] => {
  const photos: Basic[] = [];
  data.pages.forEach((page) => {
    photos.push(...page.response.results);
  });
  return photos;
};
