import useAuthStore from "@/hooks/stores/useAuthStore";
import authService, { type LoginResponse } from "@/services/auth-service";
import axios from "axios";
import { axiosInstance } from "./axios";

let isRefreshing = false;
let failedQueue: any[] = [];

export const authResponseInterceptor = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  // controllo sugli endpoint di login e refresh
  if (authService.isPublicEndpoint(originalRequest.url)) {
    return Promise.reject(error);
  }

  // se il token non esisteva in precedenza, è inutile
  // tentare di fare il refresh, romperebbe tutto
  const token = useAuthStore.getState().accessToken;
  if (!token) return Promise.reject(error);

  // Per evitare loop infiniti
  if (originalRequest._retry) {
    authService.logout();
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((token) => {
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axiosInstance(originalRequest);
    });
  }

  isRefreshing = true;

  try {
    // bisogna usare una nuova istanza pulita di axios perché quella esistente ha già gli interceptor
    // collegati, di conseguenza si richierebbero loop infiniti <--- ATTENZIONE!
    const { accessToken: newAccessToken } = await axios
      .post<LoginResponse>(
        "https://127.0.0.1:8080/api/auth/refresh",
        {},
        { withCredentials: true },
      )
      .then((res) => res.data);

    useAuthStore
      .getState()
      .setAuth(newAccessToken, useAuthStore.getState().user!);

    processQueue(null, newAccessToken);

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return axiosInstance(originalRequest);
  } catch (err) {
    console.error("response-interceptor", err);
    processQueue(err, null);
    authService.logout();
    return Promise.reject(err);
  } finally {
    isRefreshing = false;
  }
};

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};
