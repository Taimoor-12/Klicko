import { linkApi } from "@/lib/api";

export async function shortenUrl(longUrl?: string) {
  if (!longUrl) return;

  await linkApi.longToShortUrl({ longUrl });
}
