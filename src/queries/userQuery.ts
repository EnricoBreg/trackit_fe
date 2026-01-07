import type User from "@/entities/User";
import ApiClient from "@/services/api-client";
import { queryOptions } from "@tanstack/react-query";

const apiClient = new ApiClient<User>("/users");

const userQueryOptions = (userId: string) =>
  queryOptions<User, Error>({
    queryKey: ["users", userId],
    queryFn: () => apiClient.get(userId),
  });

export default userQueryOptions;
