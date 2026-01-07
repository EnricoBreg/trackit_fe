/*
export interface FetchResponse<T> {
  results: T[];
} */

import type User from "@/entities/User";

export type FetchResponse<T> = T[];
export interface LoginResponse {
  accessToken: string;
  user: User;
}
