import {
  Badge,
  Box,
  Button,
  Card,
  HStack,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "@tanstack/react-router";
import { FiClock, FiPlus } from "react-icons/fi";

/**
 * Tab Task: lista task del progetto + pulsante creazione.
 * Design: Card con indicatore di priorità e progresso visivo.
 */
const TasksTab = () => {
  const { projectId } = useParams({ strict: false });

  // Mock data
  const tasks = [
    {
      id: "1",
      title: "Implementare autenticazione OAuth",
      priority: "Alta",
      status: "In corso",
      progress: 65,
      assignee: "Marco Rossi",
      dueDate: "2025-02-05",
    },
    {
      id: "2",
      title: "Design sistema di notifiche",
      priority: "Media",
      status: "Da fare",
      progress: 0,
      assignee: "Sofia Verdi",
      dueDate: "2025-02-10",
    },
    {
      id: "3",
      title: "Refactoring componenti legacy",
      priority: "Bassa",
      status: "In revisione",
      progress: 90,
      assignee: "Luca Neri",
      dueDate: "2025-01-30",
    },
  ];

  const getPriorityColor = (priority: string) => {
    const priorityMap: Record<string, string> = {
      Alta: "red",
      Media: "orange",
      Bassa: "gray",
    };
    return priorityMap[priority] || "gray";
  };

  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      "In corso": "blue",
      "Da fare": "gray",
      "In revisione": "purple",
      Completato: "green",
    };
    return statusMap[status] || "gray";
  };

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
      <VStack gap={3} align="stretch">
        {tasks.map((task) => (
          <Card.Root key={task.id} variant="outline">
            <Card.Body>
              <VStack align="stretch" gap={3}>
                {/* Header task */}
                <HStack justify="space-between">
                  <Text fontWeight="semibold" fontSize="md">
                    {task.title}
                  </Text>
                  <HStack gap={2}>
                    <Badge
                      colorScheme={getPriorityColor(task.priority)}
                      fontSize="xs"
                    >
                      {task.priority}
                    </Badge>
                    <Badge
                      colorScheme={getStatusColor(task.status)}
                      fontSize="xs"
                    >
                      {task.status}
                    </Badge>
                  </HStack>
                </HStack>

                {/* Progress bar */}
                <Progress.Root
                  value={task.progress}
                  size="sm"
                  colorScheme="blue"
                >
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>

                {/* Metadata */}
                <HStack justify="space-between" fontSize="sm" color="gray.600">
                  <Text>Assegnato a: {task.assignee}</Text>
                  <HStack gap={1}>
                    <FiClock />
                    <Text>
                      Scadenza:{" "}
                      {new Date(task.dueDate).toLocaleDateString("it-IT")}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        ))}
      </VStack>

      {/* Stato vuoto */}
      {tasks.length === 0 && (
        <Box textAlign="center" py={12} color="gray.500">
          <Text>Nessuna task presente. Crea la prima!</Text>
        </Box>
      )}
    </Box>
  );
};

export default TasksTab;
