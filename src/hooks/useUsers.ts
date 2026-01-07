import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import usersQueryOptions from "@/queries/usersQuery";
import { useInfiniteQuery } from "@tanstack/react-query";

const useUsers = () => {
  const userQuery = useUserQueryStore((s) => s.userQuery);

  return useInfiniteQuery(usersQueryOptions(userQuery));
};

export default useUsers;
