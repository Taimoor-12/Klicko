import request from "./client";

export type LongToShortResponse = {
  shortUrl: string;
};

export const linkApi = {
  longToShortUrl: (data: { longUrl: string } ) =>
    request<LongToShortResponse>('/api/urls/shorten', {
      method: 'POST',
      body: data
    }),
}
