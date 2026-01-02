import { createFileRoute } from "@tanstack/react-router";
import { Text } from "@chakra-ui/react";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div>
      <Text fontSize="2xl">Welcome to home page!</Text>
    </div>
  );
}
