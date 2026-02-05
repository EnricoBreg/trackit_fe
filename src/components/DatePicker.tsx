import useAppTranslation from "@/hooks/useTranslation";
import {
  Button,
  Field,
  Flex,
  Input,
  InputGroup,
  Popover,
  Portal,
} from "@chakra-ui/react";
import type { i18n } from "i18next";
import { useState } from "react";
import { DayPicker, type DayPickerLocale } from "react-day-picker";
import { es, it } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { LuCalendar, LuTrash } from "react-icons/lu";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  animate?: boolean;
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

const DatePicker = ({
  label,
  name,
  placeholder,
  required = false,
  value,
  onChange,
  showOutsideDays = false,
  fixedWeeks = true,
  animate = true,
}: Props) => {
  const [selected, setSelected] = useState<Date | undefined>(value);

  const { t, i18n } = useAppTranslation();

  const handleSelection = (date: Date | undefined) => {
    setSelected(date);
    onChange(date);
  };

  const endElement = (
    <Flex alignItems="center" gap={1}>
      <LuCalendar />
    </Flex>
  );

  return (
    <Field.Root required={required}>
      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>

      <Popover.Root>
        <Popover.Trigger asChild>
          <InputGroup endElement={endElement}>
            <Input
              readOnly
              name={name}
              cursor={"pointer"}
              value={selected ? selected?.toLocaleString() : ""}
              placeholder={placeholder ?? t("selezionaUnaData")}
            />
          </InputGroup>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Body>
                <DayPicker
                  required
                  showOutsideDays={showOutsideDays}
                  fixedWeeks={fixedWeeks}
                  animate={animate}
                  mode="single"
                  selected={selected ?? undefined}
                  onSelect={handleSelection}
                  locale={getDayPickerLocale(i18n)}
                />
                <Button
                  size={"sm"}
                  variant={"surface"}
                  onClick={() => handleSelection(undefined)}
                >
                  <LuTrash />
                  {t("cancella")}
                </Button>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>

      <Field.HelperText />
      <Field.ErrorText />
    </Field.Root>
  );
};

export default DatePicker;

const getDayPickerLocale = (i18n: i18n) => {
  const localeMap: Record<string, DayPickerLocale> = {
    it: it,
    en: es,
  };

  return localeMap[i18n.language];
};
