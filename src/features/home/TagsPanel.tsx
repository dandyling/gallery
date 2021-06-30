import { Flex, FlexProps, Tag, TagLabel } from "@chakra-ui/react";
import React from "react";

interface TagsPanelProps extends FlexProps {
  tags: string[];
  onTagClick(tagTitle: string): void;
}

export const TagsPanel = (props: TagsPanelProps) => {
  const { tags, onTagClick, ...rest } = props;
  return (
    <Flex overflowX="scroll" {...rest}>
      {tags.map((tag, i) => {
        return (
          <Tag
            whiteSpace="nowrap"
            minWidth="auto"
            size="md"
            mx="1"
            key={`${i} - ${tag}`}
          >
            <TagLabel onClick={() => onTagClick(tag)}>{tag}</TagLabel>
          </Tag>
        );
      })}
    </Flex>
  );
};
