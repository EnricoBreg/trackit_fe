import logo from "@/assets/images/Track_IT__logo.png";
import Image from "@/components/Image";
import useAppTranslation from "@/hooks/useTranslation";
import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/forbidden")({
  component: ForbiddenPage,
});

function ForbiddenPage() {
  const router = useRouter();
  const { t } = useAppTranslation("forbidden");

  return (
    <Center h="100vh">
      <VStack gap={6} textAlign="center">
        <Image src={logo} />

        <Heading
          as="h1"
          fontSize={{ base: "6xl", md: "8xl" }}
          fontWeight="bold"
          color="gray.700"
        >
          403
        </Heading>

        <Heading as="h2" size="lg" color="gray.600">
          {t("accessoNegato")}
        </Heading>

        <Text fontSize={{ base: "md", md: "lg" }} color="gray.500" maxW="500px">
          {t("message")}
        </Text>

        <HStack gap={4}>
          {/* Torna alla home */}
          <Button asChild>
            <Link to="/app">{t("ritornaAllaHome")}</Link>
          </Button>

          {/* Torna alla pagina precedente */}
          <Button variant="outline" onClick={() => router.history.back()}>
            {t("tornaIndietro")}
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
}
