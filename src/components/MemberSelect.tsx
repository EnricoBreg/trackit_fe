import type ProjectMember from "@/domain/entities/ProjectMember";
import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import useProjectMembers from "@/hooks/useProjectMembers";
import useAppTranslation from "@/hooks/useTranslation";
import React from "react";
import EntitySelect from "./EntitySelect";
import UserAvatar from "./UserAvatar";

interface MemberSelectProps {
  value?: number | string;
  onChange?: (value: string | number) => void;
  caption?: string;
  projectId: string;
}

const MemberSelect = ({
  value,
  onChange = () => {},
  caption,
  projectId,
}: MemberSelectProps) => {
  const { t } = useAppTranslation();

  const { data, isLoading, fetchNextPage, hasNextPage } =
    useProjectMembers(projectId);
  const setSearchText = useUserQueryStore((s) => s.setSearchText);
  const debouncedSearchText = useDebouncedCallback(setSearchText);

  const projectMembers = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  );

  return (
    <EntitySelect<ProjectMember>
      caption={caption ?? t("utenti.caption")}
      placeholder={t("utenti.seleziona")}
      items={projectMembers}
      isLoading={isLoading}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      itemToString={(u) => {
        const nominativo =
          u.user.nome && u.user.cognome
            ? `${u.user.nome} ${u.user.cognome} (${u.role.displayName})`
            : `${u.user.username} (${u.role.displayName})`;
        return nominativo;
      }}
      itemToValue={(u) => u.user.id.toString()}
      itemToDetail={(u) => `@${u.user.username}`}
      value={value}
      onChange={onChange}
      onSearchChange={(searchText) => debouncedSearchText(searchText)}
      renderItemStart={(u) => {
        const nominativo =
          u.user.nome && u.user.cognome
            ? `${u.user.nome} ${u.user.cognome}`
            : `${u.user.username}`;
        return <UserAvatar name={nominativo} size="sm" />;
      }}
    />
  );
};

export default MemberSelect;
