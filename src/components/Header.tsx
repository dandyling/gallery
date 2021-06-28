import { Flex } from "@chakra-ui/react";
import * as React from "react";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = (props: HeaderProps) => {
  const { children } = props;
  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="0"
      justifyContent="center"
      alignItems="center"
      minWidth="100%"
      height="16"
      px="4"
    >
      {children}
    </Flex>
  );
};
