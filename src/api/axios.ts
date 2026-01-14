import axios from "axios";
import { authRequestInterceptor } from "./request-interceptor";
import { authResponseInterceptor } from "./response-interceptor";

export const axiosInstance = axios.create({
  baseURL: getBaseApiUrl(),
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

function getBaseApiUrl() {
  const protocol = import.meta.env.VITE_BACKEND_PROTOCOL;
  const ip = import.meta.env.VITE_BACKEND_SERVER_IP;
  const port = import.meta.env.VITE_BACKEND_SERVER_PORT ?? "80";
  const basePath = import.meta.env.VITE_BASE_PATH;

  return `${protocol}://${ip}:${port}${basePath}`;
};