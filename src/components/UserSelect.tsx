import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import useAppTranslation from "@/hooks/useTranslation";
import useUsers from "@/hooks/useUsers";
import {
  Box,
  Center,
  createListCollection,
  Input,
  InputGroup,
  Portal,
  Select,
  Span,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { LuSearch } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";

const UserSelect = () => {
  const { t } = useAppTranslation();
  const { data, isLoading, fetchNextPage, hasNextPage } = useUsers();
  const setSearchText = useUserQueryStore((s) => s.setSearchText);
  const [search, setSearch] = React.useState("");

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    const blockedKeys = [" ", "Spacebar"]; // Spacebar per vecchi browser
    if (blockedKeys.includes(event.key)) event.stopPropagation();
  };

  const handleOnChange = (inputText: string) => {
    setSearch(inputText);
    // questa è la chiamata con delay al metodo dello store, serve per triggerare react-query
    // il delay serve per evitare di fare chiamate al backend ogni volta che l'utente digita
    debouncedSearchText(inputText);
  };
  const debouncedSearchText = useDebouncedCallback(setSearchText);

  const fetchedUsersCount =
    data?.pages.reduce((total, page) => (total += page.results.length), 0) || 0;

  const users = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const collection = React.useMemo(
    () =>
      createListCollection({
        items: users,
        itemToString: (user) => `${user.nome} ${user.cognome}`,
        itemToValue: (user) => user.id.toString(),
      }),
    [users],
  );

  return (
    <Select.Root collection={collection} size="md" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Seleziona utente</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Seleziona utente" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <div
              id="users-scroll"
              style={{ maxHeight: "300px", overflow: "auto" }}
            >
              <Box
                padding={2}
                position="sticky"
                top="0"
                bg="bg.panel"
                zIndex="1"
              >
                <InputGroup flex="1" startElement={<LuSearch />}>
                  <Input
                    placeholder={t("ricercaPlaceholder")}
                    size="sm"
                    value={search}
                    onChange={(e) => handleOnChange(e.target.value)}
                    onKeyDown={(e) => handleOnKeyDown(e)}
                  />
                </InputGroup>
              </Box>
              <InfiniteScroll
                dataLength={fetchedUsersCount}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<Spinner />}
                scrollableTarget="users-scroll"
              >
                {isLoading && (
                  <Center>
                    <Spinner />
                  </Center>
                )}
                {collection.items.map((user) => (
                  <Select.Item item={user} key={user.id}>
                    <Stack gap="0">
                      <Select.ItemText>
                        {user.nome} {user.cognome}
                      </Select.ItemText>
                      <Span color="fg.muted" textStyle="xs">
                        @{user.username}
                      </Span>
                    </Stack>
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </InfiniteScroll>
            </div>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default UserSelect;
