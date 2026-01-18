import {
  handleBackendErrors,
  type BackendErrorResponse,
} from "@/api/responses";
import GenericHeading from "@/components/GenericHeading";
import { PasswordInput } from "@/components/ui/password-input";
import Wizard, { type WizardStep } from "@/components/Wizard";
import type User from "@/domain/entities/User";
import { createUserSchema } from "@/domain/features/users/user-wizard.schema";
import type { CreateUserForm } from "@/domain/features/users/user-wizard.types";
import useAppTranslation from "@/hooks/useTranslation";
import ApiClient from "@/services/api-client";
import {
  Box,
  Field,
  GridItem,
  Input,
  SimpleGrid,
  useSteps,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { useFormContext, type UseFormReturn } from "react-hook-form";

export const Route = createFileRoute("/app/users/new")({
  component: RouteComponent,
});

const apiClient = new ApiClient<User>("/users");

function RouteComponent() {
  const { t } = useAppTranslation();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: apiClient.post,
  });

  const steps: WizardStep<CreateUserForm>[] = [
    {
      title: t("utenti.infoUtenteStep"),
      component: UserInfoStep,
      validationFields: ["nome", "cognome", "username", "email"],
    },
    {
      title: t("utenti.passwordStep"),
      component: UserPasswordStep,
      validationFields: ["password", "confirmPassword"],
    },
  ];

  const onSubmit = async (
    formData: CreateUserForm,
    helpers: {
      methods: UseFormReturn<CreateUserForm>;
      stepsApi: ReturnType<typeof useSteps>;
    },
  ) => {
    try {
      await mutateAsync(formData);
      router.navigate({ to: "/app/users" });
    } catch (error) {
      handleBackendErrors(
        error as AxiosError<BackendErrorResponse>,
        helpers.methods,
        steps,
        helpers.stepsApi,
      );
    }
  };

  return (
    <Box spaceY={4}>
      <GenericHeading>{t("utenti.nuovo")}</GenericHeading>

      <div>
        <Wizard<CreateUserForm>
          steps={steps}
          resolver={zodResolver(createUserSchema)}
          onSubmit={onSubmit}
          completedContentText={t("utenti.confermaCreazione")}
        />
      </div>
    </Box>
  );
}

function UserInfoStep() {
  const { t } = useAppTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserForm>();

  return (
    <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
      <GridItem>
        <Field.Root>
          <Field.Label>{t("utenti.nome")}</Field.Label>
          <Input
            placeholder={t("utenti.nomePlaceholder")}
            {...register("nome")}
          />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root>
          <Field.Label>{t("utenti.cognome")}</Field.Label>
          <Input
            placeholder={t("utenti.cognomePlaceholder")}
            {...register("cognome")}
          />
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root invalid={!!errors.username} required>
          <Field.Label>
            {t("utenti.username")} <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder={t("utenti.usernamePlaceholder")}
            {...register("username")}
          />
          <Field.HelperText>{t("utenti.usernameHelper")}</Field.HelperText>
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
      </GridItem>

      <GridItem>
        <Field.Root invalid={!!errors.email} required>
          <Field.Label>
            {t("utenti.email")} <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder={t("utenti.emailPlaceholder")}
            {...register("email")}
          />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
      </GridItem>
    </SimpleGrid>
  );
}

function UserPasswordStep() {
  const { t } = useAppTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateUserForm>();

  return (
    <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
      <Box>
        <Field.Root invalid={!!errors.password} required>
          <Field.Label>
            {t("utenti.password")} <Field.RequiredIndicator />
          </Field.Label>
          <PasswordInput
            /* {...register("password")} */
            type="password"
            {...register("password")}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
      </Box>
      <Box>
        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>{t("utenti.passwordRipeti")}</Field.Label>
          <PasswordInput {...register("confirmPassword")} type="password" />
          <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
        </Field.Root>
      </Box>
    </SimpleGrid>
  );
}
