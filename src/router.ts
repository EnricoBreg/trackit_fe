/**
 * Questa è l'instanza del router che viene usato nell'applicazazione.
 * La documentazione ufficiale si trova qui: https://tanstack.com/router
 * Il file serve per avere in modo globale (oltre che attraverso l'hook useRouter)
 * l'instanza del router (come ad esempio nei service). Così facendo si riesce
 * ad effettuare redirect anche nei metodi dei service.
 *
 * @author Enrico Bregoli
 * @date 05/01/2026
 */
import { createRouter } from "@tanstack/react-router";
import queryClient from "./query-client";
// Import del routeTree automaticamente generato dal router
import { routeTree } from "./routeTree.gen";

// Creazione della nuova istanza del router
const router = createRouter({ routeTree, context: { queryClient } });

// Register dell'instanza del router per avere type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
