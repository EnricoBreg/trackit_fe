import NotFound from "@/components/errors/NotFound";
import { FullPageSpinner } from "@/components/FullPageSpinner";
import useAuthStore from "@/hooks/stores/useAuthStore";
import type { AppRouterContext } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<AppRouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const isBootstrapped = useAuthStore((s) => s.isBootstrapped);
  if (!isBootstrapped) {
    return <FullPageSpinner />;
  }

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
