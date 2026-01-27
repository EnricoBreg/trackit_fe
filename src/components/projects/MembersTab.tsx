import { Box, Button, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { Link, useParams } from "@tanstack/react-router";
import { FiMail, FiPlus } from "react-icons/fi";

/**
 * Tab Membri: lista membri del progetto + pulsante di aggiunta.
 * Pattern: Azione primaria in alto (CTA), contenuto sotto.
 */
const MembersTab = () => {
  const { projectId } = useParams({ strict: false });

  // Mock data - in produzione: fetch da API
  const members = [
    {
      id: "1",
      name: "Laura Bianchi",
      role: "Project Manager",
      email: "l.bianchi@example.com",
      avatar: "",
    },
    {
      id: "2",
      name: "Marco Rossi",
      role: "Senior Developer",
      email: "m.rossi@example.com",
      avatar: "",
    },
    {
      id: "3",
      name: "Sofia Verdi",
      role: "UX Designer",
      email: "s.verdi@example.com",
      avatar: "",
    },
    {
      id: "4",
      name: "Luca Neri",
      role: "Backend Developer",
      email: "l.neri@example.com",
      avatar: "",
    },
  ];

  return (
    <Box>
      {/* CTA primaria */}
      <Link
        to="/app/projects/$projectId/members/new"
        params={{ projectId: projectId! }}
      >
        <Button colorScheme="blue" size="md" mb={6}>
          <FiPlus />
          Aggiungi membro
        </Button>
      </Link>

      {/* Lista membri */}
      <VStack gap={3} align="stretch">
        {members.map((member) => (
          <Card.Root key={member.id} variant="outline">
            <Card.Body>
              <HStack justify="space-between">
                <HStack gap={4}>
                  {/* <Avatar name={member.name} size="md" /> */}
                  <VStack align="start" gap={1}>
                    <Text fontWeight="semibold" fontSize="md">
                      {member.name}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {member.role}
                    </Text>
                  </VStack>
                </HStack>

                <HStack gap={2} color="gray.500">
                  <FiMail />
                  <Text fontSize="sm">{member.email}</Text>
                </HStack>
              </HStack>
            </Card.Body>
          </Card.Root>
        ))}
      </VStack>

      {/* Stato vuoto */}
      {members.length === 0 && (
        <Box textAlign="center" py={12} color="gray.500">
          <Text>Nessun membro nel progetto. Aggiungi il primo!</Text>
        </Box>
      )}
    </Box>
  );
};

export default MembersTab;
