import { Flex, FlexProps, IconButton, Link } from "@chakra-ui/react";
import * as React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { Link as ReactRouterLink, useHistory } from "react-router-dom";

interface GalleryPagerProps extends FlexProps {
  currentPageNumber: number;
  totalPages: number;
}

export const GalleryPager = (props: GalleryPagerProps) => {
  const { currentPageNumber, totalPages, ...rest } = props;
  const pageNumbers = getAdjacentPages(currentPageNumber, totalPages);

  const history = useHistory();

  const hasPrevious = currentPageNumber > 1;

  const hasNext = currentPageNumber < totalPages;

  const navigateFirst = () => {
    history.push(String(1));
  };

  const navigateLast = () => {
    history.push(String(totalPages));
  };

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
          aria-label="First page"
          icon={<FaAngleDoubleLeft />}
          disabled={currentPageNumber <= 2}
          onClick={navigateFirst}
        />
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
              to={String(p)}
              key={String(p)}
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
              {p}
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
        <IconButton
          backgroundColor="transparent"
          size="xs"
          aria-label="Last page"
          disabled={currentPageNumber >= totalPages - 1}
          icon={<FaAngleDoubleRight />}
          onClick={navigateLast}
        />
      </Flex>
    </Flex>
  );
};

const getAdjacentPages = (page: number, totalPages: number) => {
  if (page <= 1) {
    return [page, page + 1, page + 2];
  } else if (page >= totalPages) {
    return [page - 2, page - 1, page];
  } else {
    return [page - 1, page, page + 1];
  }
};
