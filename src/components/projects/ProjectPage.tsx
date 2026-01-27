import type Project from "@/domain/entities/Project";
import { Box } from "@chakra-ui/react";
import { Outlet } from "@tanstack/react-router";
import ProjectHeader from "./ProjectHeader";
import ProjectTabs from "./ProjectTabs";

interface Props {
  project: Project;
}

/**
 * CAVEAT: Questo pattern richiede route nidificate per ogni tab.
 * ALTERNATIVA: Usare query params (?tab=members) con stato locale
 * per ridurre complessità e migliorare performance UX.
 */
const ProjectPage = ({ project }: Props) => {
  return (
    <>
      {/* Header con informazioni progetto */}
      <ProjectHeader project={project} />

      <Box mt={8}>
        {/* Navigation tabs */}
        <ProjectTabs projectId={project.id as string} />

        {/* Outlet per route nidificate delle tab */}
        <Box mt={6}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default ProjectPage;
