import projectsQueryOptions from "@/queries/projectsQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import useProjectQueryStore from "./stores/useProjectQueryStore";

const useProjects = () => {
  const projectQuery = useProjectQueryStore((s) => s.projectQuery);

  return useInfiniteQuery(projectsQueryOptions(projectQuery));
};

export default useProjects;
