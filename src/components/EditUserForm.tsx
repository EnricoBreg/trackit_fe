import { Toaster, toaster } from "@/components/ui/toaster";
import type User from "@/domain/entities/User";
import useAppTranslation from "@/hooks/useTranslation";
import ApiClient from "@/services/api-client";
import {
  Box,
  Button,
  Field,
  GridItem,
  Group,
  Input,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import GenericHeading from "./GenericHeading";

interface EditUserFormProps {
  user: User;
}

interface UserFormValues {
  nome: string;
  cognome: string;
  username: string;
  email: string;
}

type UpdateUserVariable = {
  id: string | number;
  data: UserFormValues;
};

const apiClient = new ApiClient<User>("users");

const EditUserForm = ({ user }: EditUserFormProps) => {
  const { t } = useAppTranslation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: {
      nome: user.nome,
      cognome: user.cognome,
      username: user.username,
      email: user.email,
    },
  });
  const { mutateAsync, isPending } = useMutation<
    User,
    AxiosError,
    UpdateUserVariable
  >({
    mutationFn: ({ id, data }) => apiClient.put(id, data),
  });

  const onSubmit = (data: UserFormValues) => {
    toaster.promise(mutateAsync({ id: user.id, data }), {
      success: {
        title: t("utenti.salvataggioCompletato.titolo"),
        description: t("utenti.salvataggioCompletato.descrizione"),
        closable: true,
      },
      error: (err: unknown) => {
        if (err instanceof AxiosError) {
          return {
            title: t("utenti.erroreSalvataggio.titolo"),
            description: t("utenti.erroreSalvataggio.descrizione", {
              errore: err.response?.data.error,
            }),
            closable: true,
          };
        }
        return {
          title: t("utenti.erroreSalvataggio.titolo"),
          description: t("utenti.erroreSalvataggio.descrizione"),
          closable: true,
        };
      },
      loading: {
        title: t("caricamento.titolo"),
        description: t("caricamento.descrizione"),
      },
    });
  };

  return (
    <>
      <Box marginBottom={8}>
        <GenericHeading>
          {t("utenti.modificaInfoUtente", { nominativo: user.username })}
        </GenericHeading>
      </Box>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Stack spaceY={4}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {/* Nome */}
            <GridItem>
              <Field.Root>
                <Field.Label>{t("utenti.nome")}</Field.Label>
                <Input {...register("nome")} />
                <Field.HelperText />
                <Field.ErrorText />
              </Field.Root>
            </GridItem>

            {/* Cognome */}
            <GridItem>
              <Field.Root>
                <Field.Label>{t("utenti.cognome")}</Field.Label>
                <Input {...register("cognome")} />
                <Field.HelperText />
                <Field.ErrorText />
              </Field.Root>
            </GridItem>

            <GridItem>
              <Field.Root required disabled>
                <Field.Label>
                  {t("utenti.username")}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("username")} />
                <Field.HelperText>
                  {t("utenti.usernameHelper")}
                </Field.HelperText>
                <Field.ErrorText />
              </Field.Root>
            </GridItem>

            <GridItem>
              <Field.Root required>
                <Field.Label>
                  {t("utenti.email")}
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input {...register("email")} />
                <Field.ErrorText />
              </Field.Root>
            </GridItem>
          </SimpleGrid>

          <Group justifyContent="center">
            <Button variant="outline" onClick={() => router.history.back()}>
              {t("annulla")}
            </Button>
            <Button variant="solid" type="submit" loading={isPending}>
              {t("salva")}
            </Button>
          </Group>
        </Stack>
      </form>
      <Toaster />
    </>
  );
};

export default EditUserForm;
