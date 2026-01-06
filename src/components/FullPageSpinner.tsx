import logo from "@/assets/images/Track_IT__logo.png";
import { Portal, Spinner, VStack } from "@chakra-ui/react";
import Image from "./Image";

interface Props {
  /** Dimensione dello spinner (default: "xl") */
  size?: "xl" | "sm" | "md" | "lg" | "inherit" | "xs" | undefined;
  /** Colore dello spinner (default: "blue.500") */
  color?: string;
  /** Mostra uno sfondo semi-trasparente */
  overlay?: boolean;
}

export function FullPageSpinner({
  size = "xl",
  color = "blue.500",
  overlay = true,
}: Props) {
  return (
    <Portal>
      <VStack
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        zIndex={9999}
        bg={overlay ? "rgba(255, 255, 255, 0.7)" : "transparent"}
      >
        <Image width={200} height={50} src={logo} />
        <Spinner size={size} color={color} borderWidth="4px" />
      </VStack>
    </Portal>
  );
}
