import type { AxiosRequestConfig } from "axios";

import { axiosInstance } from "@/api/axios";
import type { FetchResponse } from "@/api/responses";

class ApiClient<ENTITY_T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<FetchResponse<ENTITY_T>>(this.endpoint, config)
      .then((res) => res.data);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<ENTITY_T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
}

export default ApiClient;
