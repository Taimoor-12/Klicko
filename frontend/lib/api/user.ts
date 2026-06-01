import request from "./client";

export type UserStats = {
  totalClicks: number;
  totalLinks: number;
  topLink: string;
};

export type UserLinks = {
  id: string;
  shortUrl: string;
  longUrl: string;
  clicks: number;
  createdAt: string;
}

export const userApi = {
  getStats: (authToken: string) =>
    request<UserStats>('/api/me/stats', {
      headers: {
        Cookie: `authToken=${authToken}`
      }
    }),
  
  getLinks: (authToken: string) =>
    request<UserLinks[]>('/api/me/links', {
      headers: {
        Cookie: `authToken=${authToken}`
      }
    })
}
