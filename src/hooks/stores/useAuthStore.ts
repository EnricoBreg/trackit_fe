import type User from "@/entities/User";
import { AUTH_STORAGE_KEY } from "@/services/auth-service";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isBootstrapped: boolean;

  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  hydrate: () => void;
  setBootstrapped: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isBootstrapped: false,

  setAuth: (accessToken: string, user: User) => {
    set({
      accessToken,
      user,
      isAuthenticated: true,
    });

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ accessToken, user }),
    );
  },

  clearAuth: () => {
    (set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
    }),
      localStorage.removeItem(AUTH_STORAGE_KEY));
  },

  hydrate: () => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;

    try {
      const { accessToken, user } = JSON.parse(raw);

      if (accessToken) {
        set({
          accessToken,
          user,
          isAuthenticated: true,
        });
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  },

  setBootstrapped: () => {
    set({
      isBootstrapped: true,
    });
  },
}));

export default useAuthStore;
