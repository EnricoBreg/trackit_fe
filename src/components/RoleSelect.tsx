import useProjectRoleQueryStore from "@/hooks/stores/useProjectRolesQueryStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import useRoles from "@/hooks/useRoles";
import useAppTranslation from "@/hooks/useTranslation";
import React from "react";
import EntitySelect from "./EntitySelect";

interface RoleSelectProps {
  value?: number | string;
  onChange?: (value: string | number) => void;
  caption?: string;
}

const RoleSelect = ({
  value,
  onChange = () => {},
  caption,
}: RoleSelectProps) => {
  const { t } = useAppTranslation();

  const { data, isLoading, fetchNextPage, hasNextPage } = useRoles();
  const setSearchText = useProjectRoleQueryStore((s) => s.setSearchText);
  const debouncedSearchText = useDebouncedCallback(setSearchText);

  const roles = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  return (
    <EntitySelect
      caption={caption ?? t("selezionaRuolo")}
      items={roles}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      itemToString={(u) => u.displayName}
      itemToValue={(u) => u.id.toString()}
      value={value}
      onChange={onChange}
      onSearchChange={(searchText) => debouncedSearchText(searchText)}
    />
  );
};

export default RoleSelect;
