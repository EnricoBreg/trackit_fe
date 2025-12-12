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
import logoPlaceholder from "@/assets/palceholders/200x50.svg";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "axios";

interface LoginRequest {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const { t } = useTranslation("translation", { keyPrefix: "login" });

  /*
   * submit handler function
   */
  const onSubmit = ({ username, password }: LoginRequest) => {
    console.log("Submitted");
    console.log("Username", username);
    console.log("Password", password);

    axios
      .post("http://127.0.0.1:8080/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        console.log("Request send");
      })
      .catch(() => {
        console.error("Request error");
      });
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
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                  />
                </Field.Root>
              </VStack>
            </Card.Body>
            <Card.Footer>
              <Button variant="solid" width={"100%"} type="submit">
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
