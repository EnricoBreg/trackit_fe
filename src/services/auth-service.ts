import type User from "@/entities/User";
import useAuthStore from "@/hooks/stores/useAuthStore";
import type { AxiosInstance } from "axios";
import axios from "axios";
import router from "@/router";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

const AUTH_LOGIN_ENDPOINT = "/login";

class AuthService {
  private baseURL = "http://127.0.0.1:8080/api/auth";
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  login = (data: LoginRequest) => {
    return this.axiosInstance
      .post<LoginResponse>(AUTH_LOGIN_ENDPOINT, data, { withCredentials: true })
      .then((res) => res.data);
  };

  logout = () => {
    useAuthStore.getState().clearAuth();
    router.navigate({ to: AUTH_LOGIN_ENDPOINT });
  };
}

const authService = new AuthService();

export default authService;
