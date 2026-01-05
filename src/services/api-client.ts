import type User from "@/entities/User";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export interface FetchResponse<T> {
  results: T[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };

  login = (data: LoginRequest) => {
    return axiosInstance
      .post<LoginResponse>(this.endpoint, data, { withCredentials: true })
      .then((res) => res.data);
  };
}

export default ApiClient;
