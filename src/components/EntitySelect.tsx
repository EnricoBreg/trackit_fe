/**
 * Lascio a titolo di documentazione un esempio di uso di questo componente
 * con react-hook-form:
 *
 * const { control, handleSubmit } = useForm<FormValues>({
 *   defaultValues: {
 *     userId: "14",
 *     saluto: "grande",
 *   },
 * });
 *
 * <Controller
 *   name="saluto"
 *   control={control}
 *   render={({ field }) => (
 *     <EntitySelect
 *       caption="Selezione"
 *       items={[...Array(50).keys()]}
 *       itemToString={(s) => s.toString()}
 *       itemToValue={(s) => s.toString()}
 *       value={field.value}
 *       onChange={field.onChange}
 *     />
 *   )}
 *   />
 *
 * Tutte le implementazioni specifiche di questo componente, si usano alla stessa maniera.
 * Solo che servirà appunto specificare meno campi.
 *
 * @author Enrico Bregoli
 * @date 13/01/2026
 */
import useAppTranslation from "@/hooks/useTranslation";
import {
  Box,
  Center,
  createListCollection,
  HStack,
  Input,
  InputGroup,
  Portal,
  Select,
  Span,
  Spinner,
  Stack,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";

type ItemToString<T> = (item: T) => string;
type ItemToValue<T> = (item: T) => string;
type ItemToDetail<T> = (item: T) => string;
type RenderItemSlot<T> = (item: T) => React.ReactNode;

interface EntitySelectProps<T> {
  /* ======================
   * Data source
   * ====================== */
  items: readonly T[]; // lista di items da mostrare (anche paginata)

  /* ======================
   * Mapping item → UI / value
   * ====================== */
  itemToString: ItemToString<T>; // testo mostrato nel select
  itemToValue: ItemToValue<T>; // identificatore dell’item
  itemToDetail?: ItemToDetail<T>; // dettaglio secondario (opzionale)

  /* ======================
   * Rendering slots
   * ====================== */
  renderItemStart?: RenderItemSlot<T>; // elemento custom a sinistra dell’item
  renderItemEnd?: RenderItemSlot<T>; // elemento custom a destra dell’item

  /* ======================
   * Selection & control
   * ====================== */
  value?: number | string | T; // valore selezionato
  onChange: (value: number | string) => void; // callback di selezione

  /* ======================
   * Search & pagination
   * ====================== */
  onSearchChange?: (value: string) => void; // ricerca
  fetchNextPage?: () => void; // infinite scroll
  hasNextPage?: boolean;

  /* ======================
   * UI state
   * ====================== */
  isLoading?: boolean; // mostra spinner
  caption?: string; // label del select
  placeholder?: string; // placeholder
}

function EntitySelect<T>({
  /* ======================
   * Data source
   * ====================== */
  items,

  /* ======================
   * Mapping item → UI / value
   * ====================== */
  itemToString,
  itemToValue,
  itemToDetail,

  /* ======================
   * Rendering slots
   * ====================== */
  renderItemStart,
  renderItemEnd,

  /* ======================
   * Selection & control
   * ====================== */
  value,
  onChange,

  /* ======================
   * Search & pagination
   * ====================== */
  onSearchChange,
  fetchNextPage = () => {},
  hasNextPage,

  /* ======================
   * UI state
   * ====================== */
  isLoading,
  caption,
  placeholder,
}: EntitySelectProps<T>) {
  const { t } = useAppTranslation();

  const [_, setInternalValue] = useState(value);
  const [searchText, setSearchText] = useState(""); // stato di ricerca interno

  const containerRef = React.useRef(null);

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
    <div ref={containerRef}>
      <Select.Root
        collection={collection}
        size="md"
        width="full"
        defaultValue={[value?.toString()!!]}
        onValueChange={(val) => handleOnChange(val)}
      >
        <Select.HiddenSelect />
        <Select.Label>{caption}</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <HStack>
              <Select.ValueText placeholder={placeholder ?? ""} />
            </HStack>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal container={containerRef}>
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
                      <HStack gap={2}>
                        {renderItemStart && (
                          <Box flexShrink={0}>{renderItemStart(item)}</Box>
                        )}

                        <Stack gap="0">
                          <Select.ItemText>
                            {itemToString(item)}
                          </Select.ItemText>
                          <Span color="fg.muted" textStyle="xs">
                            {itemToDetail ? itemToDetail(item) : ""}
                          </Span>
                        </Stack>
                        <Select.ItemIndicator />

                        {renderItemEnd && (
                          <Box flexShrink={0}>{renderItemEnd(item)}</Box>
                        )}
                      </HStack>
                    </Select.Item>
                  ))}
                </InfiniteScroll>
              </div>
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </div>
  );
}

export default EntitySelect;
