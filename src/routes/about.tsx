import { Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <Text fontSize="2xl">Welcome to about page!</Text>
    </div>
  );
}
