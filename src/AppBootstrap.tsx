import React, { useEffect } from "react";
import useAuthStore from "./hooks/stores/useAuthStore";
import authService from "./services/auth-service";

const AppBootstrap = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setBootstrapped = useAuthStore((s) => s.setBootstrapped);

  useEffect(() => {
    authService
      .me()
      .then((user) => {
        const token = authService.getTokenFromStorage();
        if (!token) return;
        setAuth(token, user);
      })
      .catch(() => {})
      .finally(() => {
        setBootstrapped();
      });
  }, []);

  return children;
};

export default AppBootstrap;
