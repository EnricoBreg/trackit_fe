import type UserDetails from "@/entities/User";

/* export type FetchResponse<T> = T[]; */

export interface FetchResponse<T> {
  results: T[];
  currentPage: number;
  totalPage: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface LoginResponse {
  accessToken: string;
  details: UserDetails;
}
