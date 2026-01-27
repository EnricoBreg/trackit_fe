import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId/comments/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/projects/$projectId/comments/new"!</div>;
}
