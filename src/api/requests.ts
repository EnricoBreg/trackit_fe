export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterUserRequest {
  nome?: string;
  cognome?: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  nome?: string;
  cognome?: string;
  username: string;
  email: string;
}
