import { type LoginRequest } from "@/api/requests";
import logo from "@/assets/images/Track_IT__logo.png";
import useAuthStore from "@/hooks/stores/useAuthStore";
import useAppTranslation from "@/hooks/useTranslation";
import authService from "@/services/auth-service";
import {
  Button,
  Card,
  Center,
  Container,
  Field,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearch } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import Image from "./Image";
import { PasswordInput } from "./ui/password-input";
import { toaster, Toaster } from "./ui/toaster";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const { t } = useAppTranslation();

  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();
  const { redirect } = useSearch({ from: "/login" });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { accessToken, details } = data;

      setAuth(accessToken, details);
      router.navigate({ to: redirect ?? "/app" });
    },
  });

  // submit handler function
  const onSubmit = (formValues: LoginRequest) =>
    toaster.promise(mutateAsync(formValues), {
      error: (err: unknown) => {
        console.log(err);
        if (err instanceof AxiosError) {
          return {
            title: t("login.errore.titolo"),
            description:
              err.response?.data ??
              err.message ??
              t("login.errore.descrizione"),
            closable: true,
          };
        }

        return {
          title: t("login.errore.titolo"),
          description: t("login.errore.descrizione"),
          closable: true,
        };
      },
      loading: {
        title: t("caricamento.titolo"),
        description: t("caricamento.descrizione"),
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Center h="dvh">
          <Card.Root minW={{ lg: "md", sm: "sm" }} shadow={"md"}>
            <Card.Header alignItems="center">
              <Image width={200} height={50} src={logo} />
              <Card.Title>{t("login.welcomeToTrackIt")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <VStack gap="4" w="full">
                <Field.Root>
                  <Field.Label htmlFor="username">
                    {t("login.username")}
                  </Field.Label>
                  <Input {...register("username")} id="username" />
                </Field.Root>
                <Field.Root>
                  <Field.Label htmlFor="password">
                    {t("login.password")}
                  </Field.Label>
                  <PasswordInput
                    {...register("password")}
                    id="password"
                    type="password"
                  />
                </Field.Root>
              </VStack>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="solid"
                width={"100%"}
                type="submit"
                loading={isPending}
              >
                {t("login.login")}
              </Button>
            </Card.Footer>
          </Card.Root>
        </Center>
      </Container>
      <Toaster />
    </form>
  );
};

export default LoginForm;
