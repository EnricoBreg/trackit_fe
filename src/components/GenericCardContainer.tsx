import { Box } from "@chakra-ui/react";
import React from "react";

interface GenericCardContainerProps {
  children: React.ReactNode;
}

const GenericCardContainer = ({ children }: GenericCardContainerProps) => {
  return (
    <Box borderRadius="md" overflow="hidden">
      {children}
    </Box>
  );
};

export default GenericCardContainer;
