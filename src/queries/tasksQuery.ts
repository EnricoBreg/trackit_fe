import { type BackendErrorResponse, type FetchResponse } from "@/api/responses";
import type Task from "@/domain/entities/Task";
import type { TaskQuery } from "@/hooks/stores/useTasksQueryStore";
import ApiClient from "@/services/api-client";
import { infiniteQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

const tasksQueryOptions = (projectId: string, taskQuery: TaskQuery) => {
  const apiClient = new ApiClient<Task>(`/projects/${projectId}/tasks`);

  return infiniteQueryOptions<
    FetchResponse<Task>,
    AxiosError<BackendErrorResponse>
  >({
    queryKey: [`tasks/${projectId}`, taskQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          search: taskQuery.searchText,
          sort: taskQuery.sortOrder,
          page: pageParam,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
    },
  });
};

export default tasksQueryOptions;
