import "./App.css";
import { Provider } from "@/components/ui/provider";

import "./i18n/i18n.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { RouterProvider } from "@tanstack/react-router";
import useAuthStore from "./hooks/stores/useAuthStore.ts";
import queryClient from "./query-client.ts";
import router from "./router.ts";

declare module "@tanstack/react-query" {
  interface AppRouterContext {
    queryClient: QueryClient;
  }
}

// inizializzazione dell'AuthStore in modo che
// il router sia già a conoscenza per fare
// eventuali redirect da route protette
useAuthStore.getState().hydrate();

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
