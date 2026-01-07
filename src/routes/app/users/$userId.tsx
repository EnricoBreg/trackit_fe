import useUser from "@/hooks/useUser";
import userQueryOptions from "@/queries/userQuery";
import { Spinner } from "@chakra-ui/react";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$userId")({
  component: RouteComponent,
  loader: ({ params, context }) => {
    return context.queryClient.ensureQueryData(userQueryOptions(params.userId));
  },
});

function RouteComponent() {
  const { userId } = useParams({ strict: false });
  const { data: user, isLoading, error } = useUser(userId!);

  if (isLoading) return <Spinner />;

  if (error || !user) throw error;

  return (
    <div>
      Hello "/app/users/{userId}"! {user.nominativo}
    </div>
  );
}
