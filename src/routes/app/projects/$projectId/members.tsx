import MembersTab from "@/components/projects/MembersTab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId/members")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MembersTab />;
}
