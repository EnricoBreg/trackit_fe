import type Project from "@/domain/entities/Project";
import useAppTranslation from "@/hooks/useTranslation";
import getFormattedDate from "@/utils/getFormattedDate";
import getProjectStatusColor from "@/utils/getProjectStatusColor";
import { Badge, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

interface ProjectHeaderProps {
  project: Project;
}

/**
 * Header del progetto con gerarchia visiva chiara.
 * Design: Card minimalista con separazione netta dal contenuto sottostante.
 */
const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { t } = useAppTranslation();

  return (
    <Box
      bg="white"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="gray.200"
      p={6}
      boxShadow="xs"
    >
      <VStack align="start" gap={3}>
        {/* Nome progetto e status */}
        <HStack justify="space-between" w="full">
          <Heading size="2xl" fontWeight="semibold">
            {project.nome}
          </Heading>
          <Badge
            colorPalette={getProjectStatusColor(project.stato)}
            fontSize="md"
            px={3}
            py={1}
          >
            {t(`progetti.stato.${project.stato}`)}
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
              ID:{" "}
            </Text>
            {project.id}
          </Text>
          <Text>
            <Text as="span" fontWeight="medium">
              {t("progetti.creatoIl")}:{" "}
            </Text>
            {getFormattedDate(project.dataCreazione)}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProjectHeader;
