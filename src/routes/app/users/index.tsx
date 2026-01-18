import GlobalPermissionGuard from "@/components/GlobalPermissionGuard";
import SearchInput from "@/components/SearchInput";
import UsersSortSelector from "@/components/SortSelector";
import UsersList from "@/components/UsersList";
import { GlobalPermission } from "@/domain/global-permissions";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import useAppTranslation from "@/hooks/useTranslation";
import useUsers from "@/hooks/useUsers";
import usersQueryOptions from "@/queries/usersQuery";
import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { RiAddCircleLine } from "react-icons/ri";

export const Route = createFileRoute("/app/users/")({
  component: UsersPage,
  loader: ({ context }) => {
    const userQuery = useUserQueryStore.getState().userQuery;
    return context.queryClient.ensureInfiniteQueryData(
      usersQueryOptions(userQuery),
    );
  },
});

function UsersPage() {
  const { isLoading, error } = useUsers();
  const { t } = useAppTranslation();

  const setSearchText = useUserQueryStore((s) => s.setSearchText);
  const searchText = useUserQueryStore((s) => s.userQuery.searchText);

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
      <Stack
        direction={{ base: "column", md: "row" }}
        width="full"
        justifyContent="space-between"
      >
        <Stack direction={{ base: "column", md: "row" }} flex={1} gap={2}>
          <Box flex={1}>
            <SearchInput
              setSearchTextFn={setSearchText}
              searchText={searchText}
            />
          </Box>
          <UsersSortSelector />
        </Stack>
        <GlobalPermissionGuard permission={GlobalPermission.USER_CREATE.key}>
          <Button asChild>
            <Link to="/app/users/new">
              <RiAddCircleLine />
              {t("utenti.nuovo")}
            </Link>
          </Button>
        </GlobalPermissionGuard>
      </Stack>
      <Box width="full">
        <UsersList />
      </Box>
    </VStack>
  );
}
