import userQueryOptions from "@/queries/userQuery";
import { useQuery } from "@tanstack/react-query";

const useUser = (userId: string) => useQuery(userQueryOptions(userId));

export default useUser;
