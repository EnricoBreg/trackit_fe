import type User from "@/entities/User";
import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

const apiClient = new ApiClient<User>("/users");

const useUser = (id: string | number) =>
  useQuery({
    queryKey: ["users", id],
    queryFn: () => apiClient.get(id),
  });

export default useUser;
