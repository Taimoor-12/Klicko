import request from "./client";

export type User = {
  id: string;
  email: string;
  name: string;
};

export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    request<User>('/api/auth/register', {
      method: 'POST',
      body: data,
    }),

  login: (data: { email: string; password: string }) =>
    request<User>('/api/auth/login', {
      method: 'POST',
      body: data,
    }),

  check: () =>
    request<{ loggedIn: boolean; user: User }>('/api/auth/me'),

  logout: () =>
    request<{ message: string }>('/api/auth/logout', {
      method: 'POST',
      body: {}
    }),
}
