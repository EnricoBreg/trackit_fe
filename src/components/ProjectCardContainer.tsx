import { Box } from "@chakra-ui/react";
import React from "react";

interface ProjectCardContainerProps {
  children: React.ReactNode;
}

const ProjectCardContainer = ({ children }: ProjectCardContainerProps) => {
  return (
    <Box
      _hover={{
        transform: "scale(1.03)",
        transition: "transform .15s ease-in",
      }}
      borderRadius="md"
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default ProjectCardContainer;
