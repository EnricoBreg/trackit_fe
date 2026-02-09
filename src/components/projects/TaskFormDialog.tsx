import type Task from "@/domain/entities/Task";
import {
  TaskPriorities,
  TaskStatuses,
  type TaskPriority,
  type TaskStatus,
} from "@/domain/entities/Task";
import {
  taskFormSchema,
  type TaskFormValues,
} from "@/domain/features/users/task-form.schema";
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
  VStack,
} from "@chakra-ui/react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import DatePicker from "../DatePicker";
import EntitySelect from "../EntitySelect";
import MemberSelect from "../MemberSelect";
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
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TaskFormValues>({
    resolver: standardSchemaResolver(taskFormSchema), // per evitare errore di assertion di Typescript
    defaultValues: {
      stato: task?.stato ?? TaskStatuses[0],
      priorita: task?.priorita ?? TaskPriorities[2],
      dataCreazione: task?.dataCreazione
        ? new Date(task?.dataCreazione!)
        : new Date(),
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    console.log("Data", data);
  };

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
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                      <Field.Root required invalid={!!errors.titolo}>
                        <Field.Label>
                          {t("task.titolo")} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          placeholder={t("task.titolo")}
                          {...register("titolo")}
                        />
                        <Field.ErrorText>
                          {errors.titolo?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Descrizione */}
                    <GridItem colSpan={2}>
                      <Field.Root required invalid={!!errors.descrizione}>
                        <Field.Label>
                          {t("task.descrizione")} <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                          placeholder={t("task.descrizione")}
                          {...register("descrizione")}
                        />
                        <Field.ErrorText>
                          {errors.descrizione?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Stato */}
                    <GridItem colSpan={{ mdDown: 2 }}>
                      <Field.Root required invalid={!!errors.stato}>
                        <Field.Label>
                          {t("task.stato.label")} <Field.RequiredIndicator />
                        </Field.Label>
                        <Box width="full">
                          <Controller
                            name="stato"
                            control={control}
                            render={({ field }) => (
                              <EntitySelect<TaskStatus>
                                items={TaskStatuses}
                                itemToString={(i) => t(`task.stato.${i}`)}
                                itemToValue={(i) => i}
                                onChange={field.onChange}
                                value={field.value}
                              />
                            )}
                          />
                        </Box>
                        <Field.ErrorText>
                          {errors.stato?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Priorità */}
                    <GridItem colSpan={{ mdDown: 2 }}>
                      <Field.Root required invalid={!!errors.priorita}>
                        <Field.Label>
                          {t("task.priorita.label")} <Field.RequiredIndicator />
                        </Field.Label>
                        <Box width="full">
                          <Controller
                            name="priorita"
                            control={control}
                            render={({ field }) => (
                              <EntitySelect<TaskPriority>
                                items={TaskPriorities}
                                itemToString={(i) => t(`task.priorita.${i}`)}
                                itemToValue={(i) => i}
                                onChange={field.onChange}
                                value={field.value}
                              />
                            )}
                          />
                        </Box>
                        <Field.ErrorText>
                          {errors.priorita?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Assegnatario */}
                    <GridItem colSpan={{ mdDown: 2 }}>
                      <Field.Root invalid={!!errors.assegnatario}>
                        <Box width="full">
                          <Controller
                            control={control}
                            name="assegnatario"
                            render={({ field }) => (
                              <MemberSelect
                                caption={t("task.assegnaA")}
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                projectId={projectId}
                              />
                            )}
                          />
                        </Box>
                        <Field.ErrorText>
                          {errors.assegnatario?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Progresso */}
                    <GridItem>
                      <Field.Root invalid={!!errors.progresso}>
                        <Field.Label>{t("task.progresso")}</Field.Label>
                        <NumberInput.Root
                          {...register("progresso")}
                          min={0}
                          max={100}
                          formatOptions={{
                            style: "percent",
                          }}
                        >
                          {/* <NumberInput.Control /> */}
                          <NumberInput.Input />
                        </NumberInput.Root>
                        <Field.ErrorText>
                          {errors.progresso?.message}
                        </Field.ErrorText>
                      </Field.Root>
                    </GridItem>

                    {/* Data creazione */}
                    <GridItem colSpan={2}>
                      <VStack width={{ mdDown: "100%", base: "1/2" }} gap={2}>
                        {/* Data creazione */}
                        <Controller
                          name="dataCreazione"
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              label={t("task.dataCreazione")}
                              name="dataCreazione"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              isInvalid={!!fieldState.invalid}
                              error={fieldState.error?.message}
                            />
                          )}
                        />

                        {/* Data inizio lavorazione */}
                        <Controller
                          name="dataInizioLavorazione"
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              label={t("task.dataInizioLavorazione")}
                              name="dataInizioLavorazione"
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!fieldState.invalid}
                              error={fieldState.error?.message}
                            />
                          )}
                        />

                        {/* Data Scadenza */}
                        <Controller
                          name="dataScadenza"
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              label={t("task.dataScadenza")}
                              name="dataScadenza"
                              value={field.value}
                              onChange={field.onChange}
                              required
                              isInvalid={!!fieldState.invalid}
                              error={fieldState.error?.message}
                            />
                          )}
                        />

                        {/* Data chiusura */}
                        <Controller
                          name="dataChiusura"
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              label={t("task.dataChiusura")}
                              name="dataChiusura"
                              value={field.value}
                              onChange={field.onChange}
                              isInvalid={!!fieldState.invalid}
                              error={fieldState.error?.message}
                            />
                          )}
                        />
                      </VStack>
                    </GridItem>
                  </SimpleGrid>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">{t("annulla")}</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    type="submit"
                    /* loading={ isPending } */ /* disabled={!isValid} */
                  >
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
