import useAppTranslation from "@/hooks/useTranslation";
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
  type SelectValueChangeDetails,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";

type ItemToString<T> = (item: T) => string;
type ItemToValue<T> = (item: T) => string;
type ItemToDetail<T> = (item: T) => string;

interface EntitySelectProps<T> {
  items: T[]; // lista di items da mostrare (anche paginata)
  caption: string; // Caption mostrata
  isLoading?: boolean; // per mostrare lo spinner (opzionale)
  fetchNextPage?: () => void; // per infinite scroll (opzionale)
  hasNextPage?: boolean; // per infinite scroll (opzionale)
  itemToString: ItemToString<T>; // come viene mostrato il testo nel select
  itemToValue: ItemToValue<T>; // come viene identificato il valore
  itemToDetail?: ItemToDetail<T>; // come viene mostrato il valore nel dettaglio (opzionale)
  value?: number | string; // valore selezionato, solitamente id (di tipo stringa) della entity (opzionale)
  onChange: (value: number | string) => void; // callback di selezione (opzionale)
  onSearchChange?: (value: string) => void; // callback usata quando cambia il valore nella box di ricerca (opzionale)
  placeholder?: string; // placeholder che viene mostrato (opzionale)
}

function EntitySelect<T>({
  items,
  caption,
  isLoading,
  fetchNextPage = () => {},
  hasNextPage,
  itemToString,
  itemToValue,
  itemToDetail,
  value,
  onChange,
  onSearchChange,
  placeholder,
}: EntitySelectProps<T>) {
  const { t } = useAppTranslation();

  const [_, setInternalValue] = useState(value);
  const [searchText, setSearchText] = useState(""); // stato di ricerca interno

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    const blockedKeys = [" ", "Spacebar"]; // Spacebar per vecchi browser
    if (blockedKeys.includes(event.key)) event.stopPropagation();
  };

  const handleOnChange = (value: SelectValueChangeDetails) => {
    setInternalValue(value.value[0]);
    onChange(value.value[0]);
  };

  const handleOnSearchChange = (inputText: string) => {
    setSearchText(inputText);
    if (onSearchChange) onSearchChange(inputText);
  };

  const collection = useMemo(
    () => createListCollection({ items, itemToString, itemToValue }),
    [items, itemToString, itemToValue],
  );

  return (
    <Select.Root
      collection={collection}
      size="md"
      width="320px"
      defaultValue={[value?.toString()!!]}
      onValueChange={(val) => handleOnChange(val)}
    >
      <Select.HiddenSelect />
      <Select.Label>{caption}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder ?? "-"} />
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
              id="entity-scroll"
              style={{ maxHeight: "300px", overflow: "auto" }}
            >
              {onSearchChange && (
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
                      value={searchText}
                      onChange={(e) => handleOnSearchChange(e.target.value)}
                      onKeyDown={(e) => handleOnKeyDown(e)}
                    />
                  </InputGroup>
                </Box>
              )}
              <InfiniteScroll
                dataLength={items.length}
                hasMore={!!hasNextPage}
                next={() => fetchNextPage()}
                loader={<Spinner />}
                scrollableTarget="entity-scroll"
              >
                {isLoading && (
                  <Center>
                    <Spinner />
                  </Center>
                )}
                {collection.items.map((item) => (
                  <Select.Item item={item} key={itemToValue(item)}>
                    <Stack gap="0">
                      <Select.ItemText>{itemToString(item)}</Select.ItemText>
                      <Span color="fg.muted" textStyle="xs">
                        {itemToDetail ? itemToDetail(item) : ""}
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
}

export default EntitySelect;
