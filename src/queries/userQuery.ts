import type { BackendErrorResponse } from "@/api/responses";
import type User from "@/domain/entities/User";
import ApiClient from "@/services/api-client";
import { queryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

const apiClient = new ApiClient<User>("/users");

const userQueryOptions = (userId: string) =>
  queryOptions<User, AxiosError<BackendErrorResponse>>({
    queryKey: ["users", userId],
    queryFn: () => apiClient.get(userId),
  });

export default userQueryOptions;
