import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@chakra-ui/react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Text fontSize="2xl">Welcome to home page!</Text>
    </div>
  );
}
