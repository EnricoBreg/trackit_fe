import EditUserForm from "@/components/EditUserForm";
import useUser from "@/hooks/useUser";
import userQueryOptions from "@/queries/userQuery";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$userId_/edit")({
  component: RouteComponent,
  loader: ({ params, context }) => {
    return context.queryClient.ensureQueryData(userQueryOptions(params.userId));
  },
});

function RouteComponent() {
  const { userId } = useParams({ strict: false });
  const { data: user, isLoading, error } = useUser(userId!);

  return <EditUserForm user={user!} />;
}
