import { Flex, FlexProps, Select, Text } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";

export enum PageSize {
  All = 0,
  Ten = 10,
  Twenty = 20,
  Thirty = 30,
}

interface PagerChangerProps extends FlexProps {
  pageSize: PageSize;
  onPageSizeChange(pageSize: PageSize): void;
}

export const PagerChanger = (props: PagerChangerProps) => {
  const { pageSize, onPageSizeChange, ...rest } = props;

  return (
    <Flex alignItems="center" {...rest}>
      <Text>Show</Text>
      <Select
        value={pageSize}
        border="none"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          onPageSizeChange(parseInt(e.currentTarget.value));
        }}
      >
        <option value={PageSize.All}>All</option>
        <option value={PageSize.Ten}>10</option>
        <option value={PageSize.Twenty}>20</option>
        <option value={PageSize.Thirty}>30</option>
      </Select>
    </Flex>
  );
};
