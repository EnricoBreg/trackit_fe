import projectQueryOptions from "@/queries/projectQuery";
import { useQuery } from "@tanstack/react-query";

const useProject = (projectId: string) =>
  useQuery(projectQueryOptions(projectId));

export default useProject;
