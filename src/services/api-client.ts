import type { AxiosRequestConfig } from "axios";
import axios from "axios";

export interface FetchResponse<T> {
  results: T[];
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
}

export default ApiClient;
