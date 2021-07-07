import { Flex, FlexProps } from "@chakra-ui/react";
import React, { MouseEventHandler, ReactNode } from "react";

interface ScreenOverlayProps extends FlexProps {
  onClickOverlay(): void;
  children?: ReactNode;
}

export const ScreenOverlay = (props: ScreenOverlayProps) => {
  const { children, onClickOverlay, ...rest } = props;

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClickOverlay();
  };

  return (
    <Flex
      position="fixed"
      backgroundColor="black"
      width="100vw"
      height="100vh"
      top="0"
      left="0"
      onClick={handleClick}
      {...rest}
    >
      <Flex onClick={(e) => e.stopPropagation()}>{children}</Flex>
    </Flex>
  );
};
