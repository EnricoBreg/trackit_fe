import useAppTranslation from "@/hooks/useTranslation";
import { CloseButton, Input, InputGroup } from "@chakra-ui/react";
import { useRef, useState, type FormEvent } from "react";
import { LuSearch } from "react-icons/lu";

interface SearchInputProps {
  searchText: string | number | undefined;
  setSearchTextFn: (text: string) => void;
}

const SearchInput = ({ searchText, setSearchTextFn }: SearchInputProps) => {
  const { t } = useAppTranslation();
  const ref = useRef<HTMLInputElement | null>(null);

  const [value, setValue] = useState(searchText);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (ref.current) setSearchTextFn(ref.current.value);
  };

  const endElement = value ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setValue("");
        setSearchTextFn("");
        ref.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup flex="1" startElement={<LuSearch />} endElement={endElement}>
        <Input
          placeholder={t("ricercaPlaceholder")}
          ref={ref}
          borderRadius={5}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
