import useUsers from "@/hooks/useUsers";
import { createFileRoute, linkOptions } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/")({
  component: UsersPage,
});

function UsersPage() {
  const { data, isLoading, error, isError } = useUsers();

  return (
    <ul>
      {data?.results.map((user) => (
        <li>{user.nominativo}</li>
      ))}
    </ul>
  );
}
