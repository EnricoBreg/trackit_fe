import useAuthStore from "@/hooks/stores/useAuthStore";
import type { InternalAxiosRequestConfig } from "axios";

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};
