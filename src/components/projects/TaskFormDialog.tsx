import type Task from "@/domain/entities/Task";
import useAppTranslation from "@/hooks/useTranslation";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Field,
  GridItem,
  Input,
  NumberInput,
  Portal,
  SimpleGrid,
  useDialog,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import DatePicker from "../DatePicker";
import EntitySelect from "../EntitySelect";
import { Toaster } from "../ui/toaster";

interface Props {
  projectId: string;
  task?: Task;
}

const TaskFormDialog = ({ projectId, task }: Props) => {
  const dialog = useDialog({
    role: "dialog",
  });
  const { t } = useAppTranslation();

  console.log("projectId", projectId);

  const stati = [
    "DA_ASSEGNARE",
    "ASSEGNATO",
    "IN_LAVORAZIONE",
    "COMPLETATA",
    "STAND_BY",
    "BLOCCATO",
    "ANNULLATO",
  ];

  const priorita = ["BASSA", "MEDIO_BASSA", "MEDIA", "MEDIO_ALTA", "ALTA"];

  return (
    <>
      <Dialog.RootProvider
        value={dialog}
        size="cover"
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Button colorScheme="blue" size="md" mb={6}>
            <FiPlus />
            {t("task.creaNuova")}
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <form onSubmit={() => console.log("submit")}>
              <Dialog.Content
                width={{ mdDown: "90vw", mdToLg: "80vw", lg: "70vw" }}
              >
                <Dialog.Header>
                  <Dialog.Title>
                    {task ? t("task.modificaTask") : t("task.creaNuova")}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <SimpleGrid gap={6} columns={{ base: 1, md: 2 }}>
                    {/* Titolo */}
                    <GridItem colSpan={{ mdDown: 2 }}>
                      <Field.Root required>
                        <Field.Label>
                          {t("task.titolo")} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="Enter your email" />
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Descrizione */}
                    <GridItem colSpan={2}>
                      <Field.Root required>
                        <Field.Label>
                          Descrizione <Field.RequiredIndicator />
                        </Field.Label>
                        <Input placeholder="Enter your email" />
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Stato */}
                    <GridItem colSpan={{ mdDown: 2 }}>
                      <Field.Root required>
                        <Field.Label>
                          Stato <Field.RequiredIndicator />
                        </Field.Label>
                        <Box width="full">
                          <EntitySelect
                            items={stati}
                            itemToString={(i) => t(`task.stato.${i}`)}
                            itemToValue={(i) => i}
                            onChange={(value) => console.log(value)}
                            value={"DA_ASSEGNARE"}
                          />
                        </Box>
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Priorità */}
                    <GridItem colSpan={{ mdDown: 2 }}>
                      <Field.Root required>
                        <Field.Label>
                          Priorita <Field.RequiredIndicator />
                        </Field.Label>
                        <Box width="full">
                          <EntitySelect
                            items={priorita}
                            itemToString={(i) => t(`task.priorita.${i}`)}
                            itemToValue={(i) => i}
                            onChange={(value) => console.log(value)}
                            value={"MEDIA"}
                          />
                        </Box>
                        <Field.ErrorText>
                          This field is required
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Progresso */}
                    <GridItem>
                      <Field.Root>
                        <Field.Label>Progresso</Field.Label>
                        <NumberInput.Root
                          defaultValue="0"
                          min={0}
                          max={100}
                          formatOptions={{
                            style: "percent",
                          }}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                        <Field.ErrorText>The entry is invalid</Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Data creazione */}
                    <GridItem>
                      <DatePicker label="Data creazione" />
                    </GridItem>
                  </SimpleGrid>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">{t("annulla")}</Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit" /* loading={isPending} */>
                    {t("salva")}
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </form>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
      <Toaster />
    </>
  );
};

export default TaskFormDialog;
