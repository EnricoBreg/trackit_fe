import TasksTab from "@/components/projects/TasksTab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TasksTab />;
}
