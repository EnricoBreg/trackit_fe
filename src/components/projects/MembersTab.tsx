import useProjectMembers from "@/hooks/useProjectMembers";
import useAppTranslation from "@/hooks/useTranslation";
import { getUserDisplayName } from "@/utils/users-utils";
import {
  Box,
  Button,
  Card,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "@tanstack/react-router";
import React from "react";
import { FiMail, FiPlus } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import UserAvatar from "../UserAvatar";

/**
 * Tab Membri: lista membri del progetto + pulsante di aggiunta.
 * Pattern: Azione primaria in alto (CTA), contenuto sotto.
 */
const MembersTab = () => {
  const { projectId } = useParams({ strict: false });
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useProjectMembers(projectId!);
  const { t } = useAppTranslation();

  if (error)
    return <Text>{error.response?.data.message ?? error.message}</Text>;

  const fetchedTasksCount =
    data?.pages.reduce((total, page) => (total += page.results.length), 0) || 0;

  return (
    <Box>
      {/* CTA primaria */}
      <Link
        to="/app/projects/$projectId/members/new"
        params={{ projectId: projectId! }}
      >
        <Button colorScheme="blue" size="md" mb={6}>
          <FiPlus />
          {t("membri.aggiungiNuovo")}
        </Button>
      </Link>

      {/* Lista membri */}
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
              {page.results.map((member) => (
                <Card.Root key={member.id} variant="outline">
                  <Card.Body>
                    <HStack justify="space-between">
                      <HStack gap={4}>
                        <UserAvatar name={getUserDisplayName(member)} />
                        <VStack align="start" gap={1}>
                          <Text fontWeight="semibold" fontSize="md">
                            {getUserDisplayName(member)}
                          </Text>
                          <Text color="gray.600" fontSize="sm">
                            {"member.role"}
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
            </React.Fragment>
          ))}
        </VStack>
      </InfiniteScroll>
    </Box>
  );
};

export default MembersTab;
