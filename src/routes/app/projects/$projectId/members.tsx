import MembersTab from "@/components/projects/MembersTab";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import projectMembersQueryOptions from "@/queries/projectMembersQuery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId/members")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    const query = useUserQueryStore.getState().userQuery;
    return context.queryClient.ensureInfiniteQueryData(
      projectMembersQueryOptions(params.projectId, query),
    );
  },
});

function RouteComponent() {
  return <MembersTab />;
}
