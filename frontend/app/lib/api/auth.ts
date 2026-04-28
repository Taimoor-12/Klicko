import request from "./client";

export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: data,
    }),

  login: (data: { email: string; password: string }) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: data,
    }),

  check: () =>
    request<{ loggedIn: boolean; user: User }>('/api/auth/me'),
}
