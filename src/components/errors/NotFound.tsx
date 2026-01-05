import logoPlaceholder from "@/assets/palceholders/200x50.svg";
import {
  Box,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation("translation", { keyPrefix: "not_found" });

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack gap={6} textAlign="center">
        <Image src={logoPlaceholder} marginBottom={10} />
        <Heading
          as="h1"
          fontSize={{ base: "6xl", md: "8xl" }}
          fontWeight="bold"
          color="gray.700"
        >
          404
        </Heading>

        <Heading as="h2" size="lg" color="gray.600">
          {t("pageNotFound")}
        </Heading>

        <Text fontSize={{ base: "md", md: "lg" }} color="gray.500" maxW="500px">
          {t("message")}
        </Text>

        {/* <Button as={Link} to="/" colorScheme="teal" size="lg">
          Go Back Home
        </Button> */}

        <ChakraLink asChild fontSize="lg">
          <Link to="/app">{t("ritornaAllaHome")}</Link>
        </ChakraLink>
      </VStack>
    </Box>
  );
};

export default NotFound;
