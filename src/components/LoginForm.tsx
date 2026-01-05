import logoPlaceholder from "@/assets/palceholders/200x50.svg";
import useAuthStore from "@/hooks/stores/useAuthStore";
import authService, { type LoginRequest } from "@/services/auth-service";
import {
  Button,
  Card,
  Center,
  Container,
  Field,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PasswordInput } from "./ui/password-input";

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginRequest>();
  const { t } = useTranslation("translation", { keyPrefix: "login" });

  const setAuth = useAuthStore((s) => s.setAuth);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      const { accessToken, user } = data;

      setAuth(accessToken, user);
      router.navigate({ to: "/app" });
    },
    onError: () => {
      console.log("Login failed");
    },
  });

  // submit handler function
  const onSubmit = (formValues: LoginRequest) => {
    mutate(formValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Center h="dvh">
          <Card.Root minW={{ lg: "md", sm: "sm" }} shadow={"md"}>
            <Card.Header>
              <Image src={logoPlaceholder} />
              <Card.Title>{t("welcomeToTrackIt")}</Card.Title>
            </Card.Header>
            <Card.Body>
              <VStack gap="4" w="full">
                <Field.Root>
                  <Field.Label htmlFor="username">{t("username")}</Field.Label>
                  <Input {...register("username")} id="username" />
                </Field.Root>
                <Field.Root>
                  <Field.Label htmlFor="password">{t("password")}</Field.Label>
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
                {t("login")}
              </Button>
            </Card.Footer>
          </Card.Root>
        </Center>
      </Container>
    </form>
  );
};

export default LoginForm;
