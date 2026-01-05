import type User from "@/entities/User";
import ms from "ms";
import ApiClient from "@/services/api-client";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<User>("/users");

const useUsers = () => {
  const userQuery = useUserQueryStore((s) => s.userQuery);

  return useQuery({
    queryKey: ["/users", userQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          active: userQuery.active,
          search: userQuery.searchText,
          sorting: userQuery.sortOrder,
        },
      }),
    staleTime: ms("24h"),
  });
};

export default useUsers;
