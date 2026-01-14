import type UserDetails from "@/entities/User";
import { AUTH_STORAGE_KEY } from "@/services/auth-service";
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  userDetails: UserDetails | null;
  isAuthenticated: boolean;
  isBootstrapped: boolean;

  setAuth: (accessToken: string, user: UserDetails) => void;
  clearAuth: () => void;
  hydrate: () => void;
  setBootstrapped: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  userDetails: null,
  isAuthenticated: false,
  isBootstrapped: false,

  setAuth: (accessToken: string, userDetails: UserDetails) => {
    set({
      accessToken,
      userDetails,
      isAuthenticated: true,
    });

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ accessToken, userDetails })
    );
  },

  clearAuth: () => {
    (set({
      accessToken: null,
      userDetails: null,
      isAuthenticated: false,
    }),
      localStorage.removeItem(AUTH_STORAGE_KEY));
  },

  hydrate: () => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return;

    try {
      const { accessToken, userDetails } = JSON.parse(raw);

      if (accessToken) {
        set({
          accessToken,
          userDetails,
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
