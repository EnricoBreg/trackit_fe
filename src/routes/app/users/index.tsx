import UsersList from "@/components/UsersList";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import useUsers from "@/hooks/useUsers";
import usersQueryOptions from "@/queries/usersQuery";
import { Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/app/users/")({
  component: UsersPage,
  loader: ({ context }) => {
    const userQuery = useUserQueryStore.getState().userQuery;
    return context.queryClient.ensureQueryData(usersQueryOptions(userQuery));
  },
});

function UsersPage() {
  const { isLoading, error } = useUsers();
  const { t } = useTranslation("translation");

  if (isLoading)
    return (
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    );

  return (
    <VStack>
      <Heading as="h3" fontSize={{ base: "2xl", xl: "4xl" }} fontWeight="bold">
        {t("Utenti")}
      </Heading>
      <HStack>filtri...</HStack>
      <UsersList />
    </VStack>
  );
}
