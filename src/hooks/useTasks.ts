import tasksQueryOptions from "@/queries/tasksQuery";
import { useInfiniteQuery } from "@tanstack/react-query";
import useTaskQueryStore from "./stores/useTasksQueryStore";

const useTasks = (projectId: string) => {
  const query = useTaskQueryStore((s) => s.taskQuery);

  return useInfiniteQuery(tasksQueryOptions(projectId, query));
};

export default useTasks;
