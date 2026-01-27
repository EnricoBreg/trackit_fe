import CommentsTab from "@/components/projects/CommentsTab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId/comments")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CommentsTab />;
}
