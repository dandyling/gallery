import { Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

export const ErrorSplash = () => {
  return (
    <Flex
      position="fixed"
      top="0"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      direction="column"
      color="blackAlpha.700"
    >
      <Icon as={FaExclamationCircle} width="24" height="24" my="8" />
      <Heading as="h1">Unfortunately we have encoutered some error</Heading>
    </Flex>
  );
};
