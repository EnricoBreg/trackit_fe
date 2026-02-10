import useTasks from "@/hooks/useTasks";

import type Project from "@/domain/entities/Project";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useParams } from "@tanstack/react-router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GenericCardContainer from "../GenericCardContainer";
import TaskCard from "./TaskCard";
import TaskCardSkeleton from "./TaskCardSkeleton";
import TaskFormDialog from "./TaskFormDialog";

interface Props {
  project: Project;
}

/**
 * Tab Task: lista task del progetto + pulsante creazione.
 * Design: Card con indicatore di priorità e progresso visivo.
 */
const TasksTab = () => {
  const { projectId } = useParams({ strict: false });
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTasks(projectId!);

  const skeletons = [...Array(6).keys()];

  if (error)
    return <Text>{error.response?.data.message ?? error.message}</Text>;

  const fetchedTasksCount =
    data?.pages.reduce((total, page) => (total += page.results.length), 0) || 0;

  const loader = (
    <VStack>
      {skeletons.map((skeleton) => (
        <GenericCardContainer key={skeleton}>
          <TaskCardSkeleton />
        </GenericCardContainer>
      ))}
    </VStack>
  );

  return (
    <Box>
      {/* CTA primaria */}
      <TaskFormDialog projectId={projectId!} />

      {/* Lista task */}

      <InfiniteScroll
        dataLength={fetchedTasksCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={loader}
      >
        {(isLoading || isFetchingNextPage) && loader}

        <VStack gap={3} align="stretch">
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((task) => (
                <GenericCardContainer key={task.id}>
                  <TaskCard task={task} />
                </GenericCardContainer>
              ))}
            </React.Fragment>
          ))}
        </VStack>
      </InfiniteScroll>
    </Box>
  );
};

export default TasksTab;
