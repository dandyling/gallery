import { Flex, FlexProps, IconButton, Link } from "@chakra-ui/react";
import * as React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link as ReactRouterLink, useHistory } from "react-router-dom";

const PAGER_LIMIT = 5;

interface GalleryPagerProps extends FlexProps {
  currentPageNumber: number;
  totalPages: number;
  limit?: number;
}

export const GalleryPager = (props: GalleryPagerProps) => {
  const { currentPageNumber, totalPages, limit = PAGER_LIMIT, ...rest } = props;
  const pageNumbers = getPageNumbersArray(totalPages, limit);
  const history = useHistory();

  const hasPrevious = currentPageNumber > 1;

  const hasNext = currentPageNumber < totalPages;

  const navigatePrevious = () => {
    if (hasPrevious) {
      history.push(String(currentPageNumber - 1));
    }
  };

  const navigateNext = () => {
    if (hasNext) {
      history.push(String(currentPageNumber + 1));
    }
  };

  return (
    <Flex alignItems="center" justifyContent="space-between" {...rest}>
      <Flex alignItems="center">
        <IconButton
          backgroundColor="transparent"
          size="xs"
          aria-label="Previous page"
          icon={<FaAngleLeft />}
          disabled={!hasPrevious}
          onClick={navigatePrevious}
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
          disabled={!hasNext}
          icon={<FaAngleRight />}
          onClick={navigateNext}
        />
      </Flex>
    </Flex>
  );
};

const getPageNumbersArray = (totalPages: number, limit: number) => {
  const pages = totalPages > limit ? limit : totalPages;
  const pagesArray = [...Array(pages).keys()];
  return pagesArray;
};
