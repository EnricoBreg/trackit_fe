import projectMembersQueryOptions from "@/queries/projectMembersQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import useUserQueryStore from "./stores/useUserQueryStore";

const useProjectMembers = (projectId: string) => {
  const query = useUserQueryStore((s) => s.userQuery);
  return useInfiniteQuery(projectMembersQueryOptions(projectId, query));
};

export default useProjectMembers;
