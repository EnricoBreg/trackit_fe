import useUserQueryStore from "@/hooks/stores/useUserQueryStore";
import useAppTranslation from "@/hooks/useTranslation";
import { Input, InputGroup } from "@chakra-ui/react";
import { useRef, type FormEvent } from "react";
import { LuSearch } from "react-icons/lu";

const SearchInput = () => {
  const { t } = useAppTranslation();
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useUserQueryStore((s) => s.setSearchText);
  const searchText = useUserQueryStore((s) => s.userQuery.searchText);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (ref.current) setSearchText(ref.current.value);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup flex="1" startElement={<LuSearch />}>
        <Input
          placeholder={t("ricercaPlaceholder")}
          ref={ref}
          borderRadius={5}
          defaultValue={searchText}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
