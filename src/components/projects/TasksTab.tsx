import useTasks from "@/hooks/useTasks";
import useAppTranslation from "@/hooks/useTranslation";
import getFormattedDate from "@/utils/getFormattedDate";
import { getTaskPriorityColor, getTaskStatusColor } from "@/utils/tasks-utils";

import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Progress,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "@tanstack/react-router";
import React from "react";
import { FiClock, FiPlus } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import UserAvatar from "../UserAvatar";

/**
 * Tab Task: lista task del progetto + pulsante creazione.
 * Design: Card con indicatore di priorità e progresso visivo.
 */
const TasksTab = () => {
  const { projectId } = useParams({ strict: false });
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useTasks(
    projectId!,
  );
  const { t } = useAppTranslation();

  if (error)
    return <Text>{error.response?.data.message ?? error.message}</Text>;

  const fetchedTasksCount =
    data?.pages.reduce((total, page) => (total += page.results.length), 0) || 0;

  return (
    <Box>
      {/* CTA primaria */}
      <Link
        to="/app/projects/$projectId/tasks/new"
        params={{ projectId: projectId! }}
      >
        <Button colorScheme="blue" size="md" mb={6}>
          <FiPlus />
          Crea nuova task
        </Button>
      </Link>

      {/* Lista task */}

      <InfiniteScroll
        dataLength={fetchedTasksCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <VStack gap={3} align="stretch">
          {isLoading && <Spinner />}

          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.results.map((task) => (
                <Card.Root key={task.id} variant="outline">
                  <Card.Body>
                    <VStack align="stretch" gap={3}>
                      {/* Header task */}
                      <HStack justify="space-between">
                        <Text fontWeight="semibold" fontSize="md">
                          {task.titolo}
                        </Text>
                        <HStack gap={2}>
                          <Badge
                            colorPalette={getTaskPriorityColor(task.priorita)}
                            fontSize="xs"
                          >
                            {t(`task.priorita.${task.priorita}`)}
                          </Badge>
                          <Badge
                            colorPalette={getTaskStatusColor(task.stato)}
                            fontSize="xs"
                          >
                            {t(`task.stato.${task.stato}`)}
                          </Badge>
                        </HStack>
                      </HStack>

                      {/* Progress bar */}
                      <Progress.Root
                        value={task.progresso}
                        size="sm"
                        colorPalette="blue"
                      >
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>

                      {/* Metadata */}
                      <HStack
                        justify="space-between"
                        fontSize="sm"
                        color="gray.600"
                      >
                        {task.assegnatario && (
                          <Flex alignItems="center" gap={1}>
                            <Text>{t("task.assegnataA")}: </Text>
                            <UserAvatar
                              name={task.assegnatario.nominativo}
                              size="xs"
                            />
                            <Text>{task.assegnatario.nominativo}</Text>
                          </Flex>
                        )}
                        <HStack gap={1}>
                          <FiClock />
                          <Text>
                            {t("task.scadenza")}:{" "}
                            {getFormattedDate(task.dataCreazione)}
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </React.Fragment>
          ))}
        </VStack>
      </InfiniteScroll>
    </Box>
  );
};

export default TasksTab;
