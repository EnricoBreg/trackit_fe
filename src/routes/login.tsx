import LoginForm from "@/components/LoginForm";
import useAuthStore from "@/hooks/stores/useAuthStore";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/app" });
    }
  },
});

function LoginPage() {
  return <LoginForm />;
}
