import "./App.css";
import { Provider } from "@/routes/-components/ui/provider";

import "./i18n/i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Import del routeTree automaticamente generato dal router
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";

// Creazione della nuova istanza del query client
const queryClient = new QueryClient();
// Creazione della nnuova istanza del router
const router = createRouter({ routeTree, context: { queryClient } });

// Register dell'instanza del router per avere type-safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare module "@tanstack/react-query" {
  interface AppRouterContext {
    queryClient: QueryClient;
  }
}

function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
