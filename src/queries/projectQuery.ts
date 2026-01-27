import type { BackendErrorResponse } from "@/api/responses";
import type Project from "@/domain/entities/Project";
import ApiClient from "@/services/api-client";
import { queryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const apiClient = new ApiClient<Project>("/projects");

const projectQueryOptions = (projectId: string) =>
  queryOptions<Project, AxiosError<BackendErrorResponse>>({
    queryKey: ["project", projectId],
    queryFn: () => apiClient.get(projectId),
  });

export default projectQueryOptions;
