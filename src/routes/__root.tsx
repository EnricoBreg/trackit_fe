import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import type { AppRouterContext } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import MainMenu from "@/components/MainMenu";

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <HStack paddingY={4} paddingX={2}>
        <MainMenu />
      </HStack>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
