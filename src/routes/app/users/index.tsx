import useUsers from "@/hooks/useUsers";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/")({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading, error, isError } = useUsers();

  if (isLoading)
    return (
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    );

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.nominativo}</li>
      ))}
    </ul>
  );
}
