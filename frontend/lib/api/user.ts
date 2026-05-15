import request from "./client";

export type UserStats = {
  totalClicks: number;
  totalLinks: number;
  topLink: string;
};

export const userApi = {
  getStats: (authToken: string) =>
    request<UserStats>('/api/me/stats', {
      headers: {
        Cookie: `authToken=${authToken}`
      }
    }),
}
