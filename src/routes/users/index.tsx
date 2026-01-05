import useUsers from "@/hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/")({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading, error, isError } = useUsers();

  return { data };
}
