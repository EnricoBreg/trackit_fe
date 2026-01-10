import EntitySelect from "@/components/EntitySelect";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import useUsers from "@/hooks/useUsers";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";

export const Route = createFileRoute("/app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useUsers();
  const setSearchText = useUserQueryStore((s) => s.setSearchText);
  const debouncedSearch = useDebouncedCallback(setSearchText);

  const users = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(
    "14",
  );

  useEffect(() => console.log(selectedUserId), []);

  return (
    <div>
      Hello "/dashboard"!
      {/* <UserSelect /> */}
      <EntitySelect
        caption="Seleziona utente"
        items={users}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        itemToString={(u) => `${u.nome} ${u.cognome}`}
        itemToValue={(u) => u.id.toString()}
        itemToDetail={(u) => `@${u.username}`}
        value={selectedUserId}
        onChange={(val) => {
          setSelectedUserId(val.value[0].toString());
          console.log(selectedUserId);
        }}
        onSearchChange={(searchText) => debouncedSearch(searchText)}
      />
    </div>
  );
}
