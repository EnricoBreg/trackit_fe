import type { BackendErrorResponse, FetchResponse } from "@/api/responses";
import type User from "@/domain/entities/User";
import type { UserQuery } from "@/hooks/stores/useUserQueryStore";
import ApiClient from "@/services/api-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const projectMembersQueryOptions = (projectId: string, query: UserQuery) => {
  const apiClient = new ApiClient<User>(`/projects/${projectId}/members`);

  return infiniteQueryOptions<
    FetchResponse<User>,
    AxiosError<BackendErrorResponse>
  >({
    queryKey: [`members/${projectId}`, query],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          /* active: userQuery.active, */
          search: query.searchText,
          sort: query.sortOrder,
          page: pageParam,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });
};

export default projectMembersQueryOptions;
