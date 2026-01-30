import TasksTab from "@/components/projects/TasksTab";
import useTaskQueryStore from "@/hooks/stores/useTasksQueryStore";
import tasksQueryOptions from "@/queries/tasksQuery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId/tasks")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    const query = useTaskQueryStore.getState().taskQuery;
    return context.queryClient.ensureInfiniteQueryData(
      tasksQueryOptions(params.projectId, query),
    );
  },
});

function RouteComponent() {
  return <TasksTab />;
}
