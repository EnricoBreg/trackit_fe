import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import usersQueryOptions from "@/queries/usersQuery";
import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const userQuery = useUserQueryStore((s) => s.userQuery);

  return useQuery(usersQueryOptions(userQuery));
};

export default useUsers;
