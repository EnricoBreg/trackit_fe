import { Box } from "@chakra-ui/react";
import React from "react";

interface ProjectCardContainerProps {
  children: React.ReactNode;
}

const ProjectCardContainer = ({ children }: ProjectCardContainerProps) => {
  return (
    <Box borderRadius="md" overflow="hidden">
      {children}
    </Box>
  );
};

export default ProjectCardContainer;
