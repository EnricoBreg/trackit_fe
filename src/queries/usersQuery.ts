import type User from "@/entities/User";
import type { UserQuery } from "@/hooks/stores/useUserQueryStore";
import ApiClient from "@/services/api-client";
import { queryOptions } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<User>("/users");

const usersQueryOptions = (userQuery: UserQuery) =>
  queryOptions({
    queryKey: ["/users", userQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          /* active: userQuery.active,
          search: userQuery.searchText, */
          sort: userQuery.sortOrder,
        },
      }),
    staleTime: ms("24h"),
  });

export default usersQueryOptions;
