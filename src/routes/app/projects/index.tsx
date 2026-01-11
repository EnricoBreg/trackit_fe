import ProjectCardContainer from "@/components/ProjectCardContainer";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
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
  VStack,
} from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RiAddCircleLine } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const { data, isLoading, error, hasNextPage, fetchNextPage } = useProjects();
  const { t } = useAppTranslation("progetti");

  if (error) return <Text>{error.message}</Text>;
  //if (isLoading) return <Spinner />;

  const skeletons = [...Array(6).keys()];

  const projects = data?.pages.flatMap((page) => page?.results ?? []) ?? [];

  return (
    <Box>
      <VStack mb={6}>
        <Heading size={{ base: "2xl", md: "3xl", lg: "4xl" }}>
          {t("listaProgetti")}
        </Heading>
        <Button width="full" asChild>
          <Link to="/app/projects/new">
            <RiAddCircleLine />
            {t("nuovoProgetto")}
          </Link>
        </Button>
      </VStack>

      <InfiniteScroll
        dataLength={projects.length}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          templateRows="auto"
          gap="6"
        >
          {isLoading &&
            skeletons.map((skeleton) => (
              <ProjectCardContainer key={skeleton}>
                <ProjectCardSkeleton />
              </ProjectCardContainer>
            ))}

          {projects.map((project) => (
            <GridItem key={project.uuid}>
              <Box padding={4} borderWidth="1px" borderRadius="md">
                {project.nome}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}
