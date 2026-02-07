import useAppTranslation from "@/hooks/useTranslation";
import formatDateByLocale from "@/utils/formatDateByLocale";
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
import { DayPicker, type DayPickerLocale } from "react-day-picker";
import { es, it } from "react-day-picker/locale";
import "react-day-picker/style.css";
import { LuCalendar, LuTrash } from "react-icons/lu";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  showOutsideDays?: boolean;
  fixedWeeks?: boolean;
  animate?: boolean;
  value?: Date;
  onChange: (date: Date | undefined) => void;

  error?: string;
  isInvalid?: boolean;
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
  helperText,
  error,
  isInvalid,
}: Props) => {
  const { t, i18n } = useAppTranslation();

  const handleSelection = (date: Date | undefined) => {
    onChange(date);
  };

  const endElement = (
    <Flex alignItems="center" gap={1}>
      <LuCalendar />
    </Flex>
  );

  return (
    <Field.Root required={required} invalid={isInvalid}>
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
              value={value ? formatDateByLocale(value, i18n.language) : ""}
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
                  selected={value ?? undefined}
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

      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
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
