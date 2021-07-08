import { Flex, FlexProps } from "@chakra-ui/react";
import React, { MouseEventHandler, ReactNode } from "react";

interface ScreenOverlayProps extends FlexProps {
  children?: ReactNode;
}

export const ScreenOverlay = (props: ScreenOverlayProps) => {
  const { children, ...rest } = props;

  return (
    <Flex
      position="fixed"
      backgroundColor="black"
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      {...rest}
    >
      {children}
    </Flex>
  );
};
