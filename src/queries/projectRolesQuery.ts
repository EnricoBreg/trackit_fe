import type { BackendErrorResponse, FetchResponse } from "@/api/responses";
import type Role from "@/domain/entities/Role";
import type { ProjectRoleQuery } from "@/hooks/stores/useProjectRolesQueryStore";
import ApiClient from "@/services/api-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import ms from "ms";

const apiClient = new ApiClient<Role>("/roles");

const projectRolesQueryOptions = (query: ProjectRoleQuery) =>
  infiniteQueryOptions<FetchResponse<Role>, AxiosError<BackendErrorResponse>>({
    queryKey: ["roles", query],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          search: query.searchText,
          sort: query.sortOrder,
          page: pageParam,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
    staleTime: ms("5m"),
  });

export default projectRolesQueryOptions;
