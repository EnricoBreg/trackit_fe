import ProjectPage from "@/components/projects/ProjectPage";
import useProject from "@/hooks/useProject";
import projectQueryOptions from "@/queries/projectQuery";
import { Spinner } from "@chakra-ui/react";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/app/projects/$projectId")({
  component: RouteComponent,
  beforeLoad: ({ params, context }) => {
    return context.queryClient.ensureQueryData(
      projectQueryOptions(params.projectId),
    );
  },
});

function RouteComponent() {
  const { projectId } = useParams({ strict: false });
  const { data: project, isLoading, error } = useProject(projectId!);

  if (isLoading) return <Spinner />;

  if (error || !project) throw error;

  return <ProjectPage project={project} />;
}
