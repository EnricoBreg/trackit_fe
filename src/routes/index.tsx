import { Button, Text } from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <div>
      <Text fontSize="2xl">Welcome to home page!</Text>
      <Button asChild>
        <Link to="/app">Vai all'app</Link>
      </Button>
    </div>
  );
}
