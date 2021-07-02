import { Flex, FlexProps, Heading, Link } from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Basic } from "unsplash-js/dist/methods/topics/types";
import { Photo } from "../../components/Photo";
import { RatioContainer } from "../../components/RatioContainer";

interface CategoriesProps extends FlexProps {
  topics: Basic[];
  onClickCategory(category: string): void;
}

export const Categories = (props: CategoriesProps) => {
  const { onClickCategory, topics, ...rest } = props;

  return (
    <Flex direction="column" {...rest}>
      <Heading as="h2" fontSize="xl" py="2">
        Categories
      </Heading>
      <Flex overflowX="scroll">
        {topics.map((topic, i) => {
          const { cover_photo, title, id } = topic;

          const handleClick = () => {
            onClickCategory(title);
          };

          return (
            <Link as={ReactRouterLink} to="/" key={`${i} - ${id}`}>
              <RatioContainer
                mr="2"
                minHeight="35vw"
                maxHeight="30ch"
                onClick={handleClick}
                justifyContent="center"
              >
                <Photo
                  borderRadius="2xl"
                  minHeight="100%"
                  photo={cover_photo}
                />
                {title && (
                  <Heading
                    as="h3"
                    color="white"
                    textAlign="center"
                    position="absolute"
                    bottom="2"
                    fontWeight="bold"
                    shadow="lg"
                    lineHeight="1.1"
                    fontSize="md"
                  >
                    {title}
                  </Heading>
                )}
              </RatioContainer>
            </Link>
          );
        })}
      </Flex>
    </Flex>
  );
};
