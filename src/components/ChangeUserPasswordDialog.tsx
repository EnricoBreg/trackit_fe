import { updateUserPasswordSchema } from "@/domain/features/users/update-user-password.schema";
import useAppTranslation from "@/hooks/useTranslation";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Portal,
  useDialog,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { PiPasswordLight } from "react-icons/pi";
import { PasswordInput } from "./ui/password-input";
import { Toaster, toaster } from "./ui/toaster";

interface Props {
  userId: string | number;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

type UpdateUserPasswordVariables = {
  id: string | number;
  data: FormValues;
};

const ChangeUserPasswordDialog = ({ userId }: Props) => {
  const { t } = useAppTranslation();
  const dialog = useDialog();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutateAsync, isPending } = useMutation<
    FormValues,
    AxiosError,
    UpdateUserPasswordVariables
  >({
    // mutationFn: ({id, data}) => apiClient.changePassword(id, data),
    onSuccess: (_) => {
      reset();
      dialog.setOpen(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("data", data);

    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        reset();
        dialog.setOpen(false);
      }, 3000);
    });

    toaster.promise(promise /* mutateAsync({ id: userId, data }) */, {
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
    });
  };

  return (
    <>
      <Dialog.RootProvider
        value={dialog}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Dialog.Trigger asChild>
          <Button
            variant="plain"
            width="full"
            size="sm"
            _hover={{ bg: "bg.muted" }}
          >
            <PiPasswordLight />
            {t("utenti.cambioPassword.caption")}
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <Dialog.Content maxW="lg" w="md">
                <Dialog.Header>
                  <Dialog.Title>
                    {t("utenti.cambioPassword.caption")}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack gap={2}>
                    <Field.Root invalid={!!errors.password}>
                      <Field.Label>{t("utenti.password")}</Field.Label>
                      <PasswordInput {...register("password")} />
                      <Field.ErrorText>
                        {errors.password?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.confirmPassword}>
                      <Field.Label>{t("utenti.passwordRipeti")}</Field.Label>
                      <PasswordInput {...register("confirmPassword")} />
                      <Field.ErrorText>
                        {errors.confirmPassword?.message}
                      </Field.ErrorText>
                    </Field.Root>
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

export default ChangeUserPasswordDialog;
