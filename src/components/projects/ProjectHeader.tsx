import type Project from "@/domain/entities/Project";
import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

interface ProjectHeaderProps {
  project: Project;
}

/**
 * Header del progetto con gerarchia visiva chiara.
 * Design: Card minimalista con separazione netta dal contenuto sottostante.
 */
const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      IN_PROGRESS: "blue",
      DONE: "green",
      ARCHIVED: "orange",
      CANCELLED: "red",
      REJECTED: "red",
    };
    console.log(statusMap[status]);
    return statusMap[status] || "gray";
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.200"
      p={6}
      boxShadow="sm"
    >
      <VStack align="start" gap={3}>
        {/* Nome progetto e status */}
        <HStack justify="space-between" w="full">
          <Heading size="2xl" fontWeight="semibold">
            {project.nome}
          </Heading>
          <Badge
            colorPalette={getStatusColor(project.stato)}
            fontSize="sm"
            px={3}
            py={1}
          >
            {project.stato}
          </Badge>
        </HStack>

        {/* Descrizione */}
        <Text color="gray.600" fontSize="md" lineHeight="tall">
          {project.descrizione}
        </Text>

        {/* Metadata */}
        <HStack gap={4} color="gray.500" fontSize="sm">
          <Text>
            <Text as="span" fontWeight="medium">
              ID:
            </Text>{" "}
            {project.id}
          </Text>
          <Text>
            <Text as="span" fontWeight="medium">
              Creato il:
            </Text>{" "}
            {new Date(project.dataCreazione).toLocaleDateString("it-IT")}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProjectHeader;
