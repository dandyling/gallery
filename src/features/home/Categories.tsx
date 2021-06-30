import { Flex, FlexProps, Heading, Image, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";
import { Basic } from "unsplash-js/dist/methods/topics/types";

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
            return onClickCategory(title);
          };

          return (
            <RatioContainer
              mr="2"
              minHeight="35vw"
              maxHeight="30ch"
              onClick={handleClick}
              key={`${i} - ${id}`}
              justifyContent="center"
            >
              <Image
                borderRadius="2xl"
                objectFit="cover"
                minHeight="100%"
                src={cover_photo?.urls.thumb}
                alt={
                  cover_photo?.alt_description ??
                  `Photo by ${cover_photo?.user}`
                }
              />
              <Text
                color="white"
                textAlign="center"
                position="absolute"
                bottom="2"
                fontWeight="bold"
                shadow="lg"
                lineHeight="1.1"
              >
                {title}
              </Text>
            </RatioContainer>
          );
        })}
      </Flex>
    </Flex>
  );
};

interface RatioContainerProps extends FlexProps {
  aspectRatio?: string;
}

const RatioContainer = styled(Flex)<RatioContainerProps>`
  aspect-ratio: ${(props) => props.aspectRatio ?? "3 / 4"};
  position: relative;
`;
