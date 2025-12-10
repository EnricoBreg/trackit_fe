import { Button, Card, Center, Container, Field, Image, Input, VStack } from "@chakra-ui/react";
import logoPlaceholder from "@/assets/palceholders/200x50.svg"

const LoginForm = () => {
  return (
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
                <Input id="username" />
              </Field.Root>
              <Field.Root>
                <Field.Label htmlFor="password">Password</Field.Label>
                <Input id="password" type="password" />
              </Field.Root>
            </VStack>
          </Card.Body>
          <Card.Footer>
            <Button variant="solid" width={"100%"}>
              Login
            </Button>
          </Card.Footer>
        </Card.Root>
      </Center>
    </Container>
  );
};

export default LoginForm;
