import { Box, Button, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { Link, useParams } from "@tanstack/react-router";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import UserAvatar from "../UserAvatar";

/**
 * Tab Commenti: timeline di commenti + pulsante aggiunta.
 * Design: Card con avatar e timestamp, stile conversazionale.
 */
const CommentsTab = () => {
  const { projectId } = useParams({ strict: false });

  // Mock data
  const comments = [
    {
      id: "1",
      author: "Laura Bianchi",
      content:
        "Ottimo lavoro sul refactoring! Ho notato però che alcuni test unitari sono mancanti nei nuovi componenti.",
      timestamp: "2025-01-27T10:30:00",
      avatar: "",
    },
    {
      id: "2",
      author: "Marco Rossi",
      content:
        "Hai ragione Laura, aggiungo i test oggi pomeriggio. Nel frattempo, qualcuno può revieware il PR #142?",
      timestamp: "2025-01-27T11:15:00",
      avatar: "",
    },
    {
      id: "3",
      author: "Luca Neri",
      content:
        "Io posso occuparmi della review. Marco, hai aggiornato anche la documentazione delle API?",
      timestamp: "2025-01-27T14:20:00",
      avatar: "",
    },
  ];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours} ore fa`;
    }
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box>
      {/* CTA primaria */}
      <Link
        to="/app/projects/$projectId/comments/new"
        params={{ projectId: projectId! }}
      >
        <Button colorScheme="blue" size="md" mb={6}>
          <FiPlus />
          Aggiungi nuovo commento
        </Button>
      </Link>

      {/* Timeline commenti */}
      <VStack gap={4} align="stretch">
        {comments.map((comment) => (
          <Card.Root key={comment.id} variant="outline">
            <Card.Body>
              <HStack align="start" gap={4}>
                <UserAvatar name={comment.author} />
                <VStack align="start" gap={2} flex="1">
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="semibold" fontSize="sm">
                      {comment.author}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {formatTimestamp(comment.timestamp)}
                    </Text>
                  </HStack>
                  <Text color="gray.700" fontSize="sm" lineHeight="tall">
                    {comment.content}
                  </Text>
                </VStack>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
      </VStack>

      {/* Stato vuoto */}
      {comments.length === 0 && (
        <Box textAlign="center" py={12} color="gray.500">
          <VStack gap={2}>
            <FiMessageSquare size={48} />
            <Text>Nessun commento ancora. Avvia la conversazione!</Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default CommentsTab;
