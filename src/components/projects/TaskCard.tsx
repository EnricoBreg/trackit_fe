import type Task from "@/domain/entities/Task";
import useAppTranslation from "@/hooks/useTranslation";
import formatDateByLocale from "@/utils/formatDateByLocale";
import { getTaskPriorityColor, getTaskStatusColor } from "@/utils/tasks-utils";
import {
  Badge,
  Card,
  Flex,
  HStack,
  Progress,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import UserAvatar from "../UserAvatar";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const { t, i18n } = useAppTranslation();

  return (
    <Card.Root variant="outline" width="full">
      <Card.Body>
        <VStack align="stretch" gap={3}>
          {/* Header task */}
          <Stack
            justify="space-between"
            direction={{ mdDown: "column", md: "row" }}
          >
            <Text fontWeight="semibold" fontSize="lg" order={{ mdDown: 2 }}>
              {task.titolo}
            </Text>
            <HStack gap={2} order={{ mdDown: 1 }}>
              <Badge
                colorPalette={getTaskPriorityColor(task.priorita)}
                fontSize="sm"
              >
                {t(`task.priorita.${task.priorita}`)}
              </Badge>
              <Badge
                colorPalette={getTaskStatusColor(task.stato)}
                fontSize="sm"
              >
                {t(`task.stato.${task.stato}`)}
              </Badge>
            </HStack>
          </Stack>

          <Text lineClamp={2}>{task.descrizione}</Text>

          {/* Progress bar */}
          <Progress.Root value={task.progresso} size="sm" colorPalette="blue">
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>

          {/* Metadata */}
          <HStack justify="space-between" fontSize="sm" color="gray.600">
            {task.assegnatario && (
              <Flex alignItems="center" gap={1}>
                <Text>{t("task.assegnataA")}: </Text>
                <UserAvatar name={task.assegnatario.nominativo} size="xs" />
                <Text>{task.assegnatario.nominativo}</Text>
              </Flex>
            )}
            <HStack gap={1}>
              <FiClock />
              <Text>
                {t("task.scadenza")}:{" "}
                {task.dataCreazione
                  ? formatDateByLocale(task.dataCreazione, i18n.language)
                  : ""}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default TaskCard;
