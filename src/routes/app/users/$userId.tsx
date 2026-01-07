import Clipboard from "@/components/Clipboard";
import useUser from "@/hooks/useUser";
import userQueryOptions from "@/queries/userQuery";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/app/users/$userId")({
  component: RouteComponent,
  loader: ({ params, context }) => {
    return context.queryClient.ensureQueryData(userQueryOptions(params.userId));
  },
});

function RouteComponent() {
  const { userId } = useParams({ strict: false });
  const { data: user, isLoading, error } = useUser(userId!);

  if (isLoading) return <Spinner />;

  if (error || !user) throw error;

  return (
    <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
      <GridItem>
        <Flex justifyContent="center" alignItems="center">
          <Avatar.Root size={"2xl"} variant={"solid"}>
            <Avatar.Fallback name={user.nome + " " + user.cognome} />
            <Avatar.Image />
          </Avatar.Root>
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <VStack spaceY={4} align="start">
          <Box>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="bold"
            >
              {user.nome + " " + user.cognome}
            </Heading>
            <Text fontSize="xl" color="gray.400">
              @{user.username}
            </Text>
          </Box>

          <Box>
            <Heading
              as="h3"
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="bold"
            >
              Contatti
            </Heading>

            <VStack>
              {/* Elemento lista contatti */}
              <Flex gap={10} alignItems="center">
                <Box>Email</Box>
                <HStack>
                  {user.email}
                  <Clipboard value={user.email} size="xs" />
                </HStack>
              </Flex>

              <Flex gap={10} alignItems="center">
                <Box>Telefono</Box>
                <HStack>
                  00393338087889
                  <Clipboard value="00393338087889" size="xs" />
                </HStack>
              </Flex>
            </VStack>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}
