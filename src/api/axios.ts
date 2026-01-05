import axios from "axios";
import { authRequestInterceptor } from "./request-interceptor";
import { authResponseInterceptor } from "./response-interceptor";

export const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api",
  withCredentials: true,
});

// Interceptor delle richieste
axiosInstance.interceptors.request.use(authRequestInterceptor);

// Interceptor delle response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return authResponseInterceptor(error);
  },
);
