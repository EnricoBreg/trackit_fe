import { type FetchResponse } from "@/api/responses";
import type Project from "@/domain/entities/Project";
import type { ProjectQuery } from "@/hooks/stores/useProjectQueryStore";
import ApiClient from "@/services/api-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import ms from "ms";

const apiClient = new ApiClient<Project>("/projects");

const projectsQueryOptions = (projectQuery: ProjectQuery) =>
  infiniteQueryOptions<FetchResponse<Project>, Error>({
    queryKey: ["projects", projectQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          search: projectQuery.searchText,
          sort: projectQuery.sortOrder,
          page: pageParam,
        },
      }),
    staleTime: ms("2m"),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });

export default projectsQueryOptions;
