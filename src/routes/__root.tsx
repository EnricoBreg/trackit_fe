import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import type { AppRouterContext } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <HStack>
        <ChakraLink asChild>
          <Link to="/">Home</Link>
        </ChakraLink>
        <ChakraLink asChild>
          <Link to="/users">Users</Link>
        </ChakraLink>
        <ChakraLink asChild>
          <Link to="/about">About</Link>
        </ChakraLink>
        <ChakraLink asChild>
          <Link to="/login">Login</Link>
        </ChakraLink>
      </HStack>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
