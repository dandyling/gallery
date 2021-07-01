import { Flex, FlexProps } from "@chakra-ui/react";
import styled from "@emotion/styled";

interface RatioContainerProps extends FlexProps {
  ratio?: string;
}

export const RatioContainer = styled(Flex)<RatioContainerProps>`
  aspect-ratio: ${(props) => props.ratio ?? "3 / 4"};
  position: relative;
`;
