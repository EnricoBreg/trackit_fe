import projectRolesQueryOptions from "@/queries/projectRolesQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import useProjectRoleQueryStore from "./stores/useProjectRolesQueryStore";

const useRoles = () => {
  const query = useProjectRoleQueryStore((s) => s.projectRoleQuery);
  return useInfiniteQuery(projectRolesQueryOptions(query));
};

export default useRoles;
