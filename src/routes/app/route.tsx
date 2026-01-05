/**
 * Questo file contiene la logina di rendirizzamento qualora la sessione
 * sia scaduta (auth state nullo). Nello specifico, inoltre, questo file è il file di
 * layout (anche se il nome route.tsx) potrebbe essere fuoriviante.
 * Tutte le rotte che discendono da /app ereditano il beforeLoad del
 * layout di conseguenza, ereditano tutte la protezione contro
 * accessi non autenticati. Nel beforeLoad viene perciò specificata
 * la logica di rendirezzamento.
 *
 * @author Enrico Bregoli
 * @date 05/01/2026
 */

import Navbar from "@/components/Navbar";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { Box } from "@chakra-ui/react";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },

  component: AppSecureLayout,
});

function AppSecureLayout() {
  return (
    <Box>
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </Box>
  );
}
