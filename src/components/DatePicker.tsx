import { Field, Input, Popover, Portal, Text } from "@chakra-ui/react";

interface Props {
  label: string;
  required?: boolean;
}

const DatePicker = ({ label, required = false }: Props) => {
  return (
    <Field.Root required={required}>
      {/* <Popover placement="bottom-start">
      <Popover.Trigger>
        <Input
          name={name}
          readOnly
          cursor="pointer"
          value={value ? format(value, "dd/MM/yyyy") : ""}
          placeholder="Seleziona una data"
        />
      </Popover.Trigger>

      <Popover.Content w="auto">
        <Popover.Body>
          <DayPicker
            mode="single"
            selected={value ?? undefined}
            onSelect={onChange}
            locale={it}
          />
        </Popover.Body>
      </Popover.Content>
    </Popover> */}

      <Field.Label>
        {label} <Field.RequiredIndicator />
      </Field.Label>

      <Popover.Root>
        <Popover.Trigger asChild>
          <Input />
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Body>
                <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
                <Text my="4">
                  Naruto is a Japanese manga series written and illustrated by
                  Masashi Kishimoto.
                </Text>
                <Input placeholder="Your fav. character" size="sm" />
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
