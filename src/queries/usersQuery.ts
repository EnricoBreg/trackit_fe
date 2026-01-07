import type { FetchResponse } from "@/api/responses";
import type User from "@/entities/User";
import type { UserQuery } from "@/hooks/stores/useUserQueryStore";
import ApiClient from "@/services/api-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<User>("/users");

const usersQueryOptions = (userQuery: UserQuery) =>
  infiniteQueryOptions<FetchResponse<User>, Error>({
    queryKey: ["/users", userQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          /* active: userQuery.active,
          search: userQuery.searchText, */
          sort: userQuery.sortOrder,
          page: pageParam,
        },
      }),
    staleTime: ms("24h"),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });

export default usersQueryOptions;
