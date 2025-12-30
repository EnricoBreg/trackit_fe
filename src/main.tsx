import { Provider } from "@/routes/-components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./i18n/i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Import del routeTree automaticamente generato dal router
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Creazione della nnuova istanza del router
const router = createRouter({ routeTree });
// Creazione della nuova istanza del query client
const queryClient = new QueryClient();

// Register dell'instanza del router per avere type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render dell'applicazione
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
