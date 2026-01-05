import { axiosInstance } from "@/api/axios";
import type User from "@/entities/User";
import useAuthStore from "@/hooks/stores/useAuthStore";
import router from "@/router";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

const AUTH_LOGIN_ENDPOINT = "/auth/login";
const AUTH_REFRESH_JWT_ENDPOINT = "/auth/refresh";
const AUTH_ME_ENDPOINT = "/auth/me";

const AUTH_LOGIN_ROUTE = "/login";

export const AUTH_STORAGE_KEY = "auth";

class AuthService {
  login = (data: LoginRequest) => {
    return axiosInstance
      .post<LoginResponse>(AUTH_LOGIN_ENDPOINT, data)
      .then((res) => res.data);
  };

  logout = () => {
    useAuthStore.getState().clearAuth();
    router.navigate({ to: AUTH_LOGIN_ROUTE });
  };

  refresh = () => {
    return axiosInstance
      .post<LoginResponse>(AUTH_REFRESH_JWT_ENDPOINT, {})
      .then((res) => res.data);
  };

  me = () => {
    return axiosInstance.get<User>(AUTH_ME_ENDPOINT).then((res) => res.data);
  };

  isPublicEndpoint = (url?: string) =>
    [AUTH_LOGIN_ENDPOINT, AUTH_REFRESH_JWT_ENDPOINT].some((endpoint) =>
      url?.includes(endpoint),
    );

  getTokenFromStorage = () => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const { accessToken } = JSON.parse(raw);
    return accessToken as string;
  };
}

const authService = new AuthService();

export default authService;
