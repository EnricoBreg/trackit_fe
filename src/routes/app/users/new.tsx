import GenericHeading from "@/components/GenericHeading";
import { PasswordInput } from "@/components/ui/password-input";
import Wizard from "@/components/Wizard";
import { createUserSchema } from "@/domain/features/users/user-wizard.schema";
import type { CreateUserForm } from "@/domain/features/users/user-wizard.types";
import useAppTranslation from "@/hooks/useTranslation";
import { Box, Field, GridItem, Input, SimpleGrid } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

export const Route = createFileRoute("/app/users/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useAppTranslation();

  return (
    <Box spaceY={4}>
      <GenericHeading>{t("utenti.nuovo")}</GenericHeading>

      <div>
        <Wizard<CreateUserForm>
          steps={[
            {
              title: t("utenti.infoUtenteStep"),
              component: UserInfoStep,
              fields: ["username", "email"],
            },
            {
              title: t("utenti.passwordStep"),
              component: UserPasswordStep,
              fields: ["password"],
            },
          ]}
          resolver={zodResolver(createUserSchema)}
          onSubmit={(data) => console.log("Submit finale", data)}
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
        <Field.Root invalid={!!errors.username}>
          <Field.Label>{t("utenti.username")}</Field.Label>
          <Input
            placeholder={t("utenti.usernamePlaceholder")}
            {...register("username")}
          />
          <Field.HelperText>{t("utenti.usernameHelper")}</Field.HelperText>
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
      </GridItem>
      <GridItem>
        <Field.Root invalid={!!errors.email}>
          <Field.Label>{t("utenti.email")}</Field.Label>
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
  const [equalPassword, setEqualPassword] = useState(true);
  const password = useRef<HTMLInputElement>(null);
  const repeatPassword = useRef<HTMLInputElement>(null);

  const checkPassword = () => {
    setEqualPassword(password.current?.value === repeatPassword.current?.value);
  };

  return (
    <SimpleGrid gap={4} columns={{ base: 1, md: 2 }}>
      <Box>
        <Field.Root invalid={!!errors.password}>
          <Field.Label>{t("utenti.password")}</Field.Label>
          <PasswordInput
            /* {...register("password")} */
            type="password"
            {...register("password")}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
      </Box>
      <Box>
        <Field.Root invalid={!equalPassword}>
          <Field.Label>{t("utenti.passwordRipeti")}</Field.Label>
          <PasswordInput
            /* {...register("password")} */
            type="password"
          />
          <Field.ErrorText>{t("utenti.passwordDiverse")}</Field.ErrorText>
        </Field.Root>
      </Box>
    </SimpleGrid>
  );
}
