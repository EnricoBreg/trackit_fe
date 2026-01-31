import type { AddProjectMembeRequest } from "@/api/requests";
import type { BackendErrorResponse } from "@/api/responses";
import type ProjectMember from "@/domain/entities/ProjectMember";
import useAppTranslation from "@/hooks/useTranslation";
import ApiClient from "@/services/api-client";
import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDialog,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import RoleSelect from "../RoleSelect";
import UserSelect from "../UserSelect";
import { toaster, Toaster } from "../ui/toaster";

interface Props {
  projectId: string;
}

interface FormValues {
  userId?: string | number;
  roleId?: string;
}

const MemberFormDialog = ({ projectId }: Props) => {
  const apiClient = new ApiClient<ProjectMember>(
    `/projects/${projectId}/members`,
  );

  const dialog = useDialog();
  const { t } = useAppTranslation();
  const queryClient = useQueryClient();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      roleId: undefined,
      userId: undefined,
    },
  });

  const { mutateAsync, isPending } = useMutation<
    ProjectMember,
    AxiosError<BackendErrorResponse>,
    AddProjectMembeRequest
  >({
    mutationFn: async ({ userId, roleId }) => {
      const member = await apiClient.post<AddProjectMembeRequest>({
        userId,
        roleId,
      });
      return member;
    },
    onSuccess: () => {
      reset();
      dialog.setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`members/${projectId}`],
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    toaster.promise(
      /* promise */ mutateAsync({ userId: data.userId!, roleId: data.roleId! }),
      {
        success: {
          title: t("utenti.cambioPassword.successo"),
          closable: true,
        },
        error: {
          title: t("utenti.cambioPassword.errore"),
          closable: true,
        },
        loading: {
          title: t("caricamento.titolo"),
        },
      },
    );
  };

  return (
    <>
      <Dialog.RootProvider
        value={dialog}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Button colorScheme="blue" size="md" mb={6}>
            <FiPlus />
            {t("membri.aggiungiNuovo")}
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Dialog.Content maxW="lg" w="md">
                <Dialog.Header>
                  <Dialog.Title>Aggiungi nuovo membro</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack gap={2}>
                    <Box width="full">
                      <Controller
                        name="userId"
                        control={control}
                        render={({ field }) => (
                          <UserSelect
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </Box>

                    <Box width="full">
                      <Controller
                        name="roleId"
                        control={control}
                        render={({ field }) => (
                          <RoleSelect
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </Box>
                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">{t("annulla")}</Button>
                  </Dialog.ActionTrigger>
                  <Button type="submit" loading={isPending}>
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

export default MemberFormDialog;
