import useProjectQueryStore from "@/hooks/stores/useProjectQueryStore";
import useProjects from "@/hooks/useProjects";
import useAppTranslation from "@/hooks/useTranslation";
import projectQueryOptions from "@/queries/projectsQuery";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RiAddCircleLine } from "react-icons/ri";

export const Route = createFileRoute("/app/projects/")({
  component: ProjectsIndexPage,
  loader: ({ context }) => {
    const projectQuery = useProjectQueryStore.getState().projectQuery;
    return context.queryClient.ensureInfiniteQueryData(
      projectQueryOptions(projectQuery),
    );
  },
});

function ProjectsIndexPage() {
  const { data, isLoading, error } = useProjects();
  const { t } = useAppTranslation("progetti");

  if (error) return <Text>{error.message}</Text>;
  if (isLoading) return <Spinner />;

  const projects = data?.pages.flatMap((page) => page?.results ?? []) ?? [];

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        xl: "repeat(3, 1fr)",
      }}
      templateRows="auto"
      gap="6"
    >
      {/* Heading */}
      <GridItem colSpan={{ base: 1, md: 2, xl: 3 }}>
        <Heading size={{ base: "2xl", md: "3xl", lg: "4xl" }}>
          {t("listaProgetti")}
        </Heading>
      </GridItem>

      {/* Aggiungi progetto */}
      <GridItem colSpan={{ base: 1, md: 2, xl: 3 }}>
        <Button width="full" asChild>
          <Link to="/app/projects/new">
            <RiAddCircleLine />
            {t("nuovoProgetto")}
          </Link>
        </Button>
      </GridItem>

      {/* Lista progetti */}
      {projects.map((project) => (
        <GridItem key={project.uuid}>
          <Box padding={4} borderWidth="1px" borderRadius="md">
            {project.nome}
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
}
