import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <HStack>
        <ChakraLink asChild>
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
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
