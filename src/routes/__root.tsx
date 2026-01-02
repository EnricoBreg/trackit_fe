import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import type { AppRouterContext } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <Box>
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
}
