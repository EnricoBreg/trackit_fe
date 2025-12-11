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

  const onSubmit = ({ username, password }: LoginRequest) => {
    console.log("Submitted");
    console.log("Username", username);
    console.log("Password", password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Center h="dvh">
          <Card.Root minW={{ lg: "md", sm: "sm" }}>
            <Card.Header>
              <Image src={logoPlaceholder} />
              <Card.Title>Sign in</Card.Title>
            </Card.Header>
            <Card.Body>
              <VStack gap="4" w="full">
                <Field.Root>
                  <Field.Label htmlFor="username">Username</Field.Label>
                  <Input {...register("username")} id="username" />
                </Field.Root>
                <Field.Root>
                  <Field.Label htmlFor="password">Password</Field.Label>
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
                Login
              </Button>
            </Card.Footer>
          </Card.Root>
        </Center>
      </Container>
    </form>
  );
};

export default LoginForm;
