import { Heading } from "@chakra-ui/react";
import React from "react";

interface GenericHeadingProps {
  children: React.ReactNode;
}

const GenericHeading = ({ children }: GenericHeadingProps) => {
  return (
    <Heading size={{ base: "2xl", md: "3xl", lg: "4xl" }}>{children}</Heading>
  );
};

export default GenericHeading;
