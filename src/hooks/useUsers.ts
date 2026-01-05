import type User from "@/entities/User";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import ms from "ms";

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
