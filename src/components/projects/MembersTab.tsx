import useProjectMembers from "@/hooks/useProjectMembers";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import { useParams } from "@tanstack/react-router";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import MemberCard from "./MemberCard";
import MemberFormDialog from "./MemberFormDialog";

/**
 *
 * Tab Membri: lista membri del progetto + pulsante di aggiunta.
 * Pattern: Azione primaria in alto (CTA), contenuto sotto.
 */
const MembersTab = () => {
  const { projectId } = useParams({ strict: false });
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useProjectMembers(projectId!);

  if (error)
    return <Text>{error.response?.data.message ?? error.message}</Text>;

  const fetchedTasksCount =
    data?.pages.reduce((total, page) => (total += page.results.length), 0) || 0;

  return (
    <Box>
      {/* CTA primaria */}
      {/* TODO: fare form con un semplice dialog? */}

      <MemberFormDialog projectId={projectId!} />

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
                <MemberCard member={member} />
              ))}
            </React.Fragment>
          ))}
        </VStack>
      </InfiniteScroll>
    </Box>
  );
};

export default MembersTab;
