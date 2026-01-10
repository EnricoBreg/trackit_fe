import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import useAppTranslation from "@/hooks/useTranslation";
import useUsers from "@/hooks/useUsers";
import React from "react";
import EntitySelect from "./EntitySelect";

interface UserSelectProps {
  value?: number | string;
  onChange?: (value: string | number) => void;
  caption?: string;
}

const UserSelect = ({
  value,
  onChange = () => {},
  caption,
}: UserSelectProps) => {
  const { t } = useAppTranslation();

  const { data, isLoading, fetchNextPage, hasNextPage } = useUsers();
  const setSearchText = useUserQueryStore((s) => s.setSearchText);
  const debouncedSearchText = useDebouncedCallback(setSearchText);

  const users = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  return (
    <EntitySelect
      caption={caption ?? t("selezionaUtente")}
      items={users}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      itemToString={(u) => `${u.nome} ${u.cognome}`}
      itemToValue={(u) => u.id.toString()}
      itemToDetail={(u) => `@${u.username}`}
      value={value}
      onChange={onChange}
      onSearchChange={(searchText) => debouncedSearchText(searchText)}
    />
  );
};

export default UserSelect;
