import GenericCardContainer from "@/components/GenericCardContainer";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import useProjects from "@/hooks/useProjects";
import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";

const ProjectGrid = () => {
  const { data, isLoading, error, hasNextPage, fetchNextPage } = useProjects();

  if (error) return <Text>{error.message}</Text>;

  const skeletons = [...Array(6).keys()];

  const projects = data?.pages.flatMap((page) => page?.results ?? []) ?? [];

  return (
    <InfiniteScroll
      dataLength={projects.length}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
        {isLoading &&
          skeletons.map((skeleton) => (
            <GenericCardContainer key={skeleton}>
              <ProjectCardSkeleton />
            </GenericCardContainer>
          ))}

        {projects.map((project) => (
          <GenericCardContainer key={project.id}>
            <ProjectCard project={project} />
          </GenericCardContainer>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default ProjectGrid;
