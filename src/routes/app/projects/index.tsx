import GlobalPermissionGuard from "@/components/GlobalPermissionGuard";
import ProjectGrid from "@/components/ProjectGrid";
import SearchInput from "@/components/SearchInput";
import { GlobalPermission } from "@/domain/global-permissions";
import useProjectQueryStore from "@/hooks/stores/useProjectQueryStore";
import useProjects from "@/hooks/useProjects";
import useAppTranslation from "@/hooks/useTranslation";
import projectQueryOptions from "@/queries/projectsQuery";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
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
  const { error } = useProjects();
  const { t } = useAppTranslation();
  const {
    projectQuery: { searchText },
    setSearchText,
  } = useProjectQueryStore();

  if (error) return <Text>{error.message}</Text>;

  return (
    <Box spaceY={4}>
      <VStack mb={6}>
        <Heading size={{ base: "2xl", md: "3xl", lg: "4xl" }}>
          {t("progetti.listaProgetti")}
        </Heading>
        <GlobalPermissionGuard permission={GlobalPermission.PROJECT_CREATE.key}>
          <Button width="full" asChild>
            <Link to="/app/projects/new">
              <RiAddCircleLine />
              {t("nuovoProgetto")}
            </Link>
          </Button>
        </GlobalPermissionGuard>
      </VStack>

      <Box>
        <SearchInput searchText={searchText} setSearchTextFn={setSearchText} />
      </Box>

      <ProjectGrid />
    </Box>
  );
}
