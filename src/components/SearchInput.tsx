import useAppTranslation from "@/hooks/useTranslation";
import { Input, InputGroup } from "@chakra-ui/react";
import { useRef, type FormEvent } from "react";
import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
  searchText: string | number | undefined;
  setSearchTextFn: (text: string) => void;
}

const SearchInput = ({ searchText, setSearchTextFn }: SearchInputProps) => {
  const { t } = useAppTranslation();
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (ref.current) setSearchTextFn(ref.current.value);
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
