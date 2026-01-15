import LoginForm from "@/components/LoginForm";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: LoginPage,
  beforeLoad: ({ search }) => {
    const { isAuthenticated } = useAuthStore.getState();
    console.log("isAuthenticated", isAuthenticated);
    if (isAuthenticated) {
      throw redirect({ to: search.redirect ?? "/app" });
    }
  },
});

function LoginPage() {
  return <LoginForm />;
}
