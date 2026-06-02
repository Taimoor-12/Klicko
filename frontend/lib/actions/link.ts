import { linkApi } from "@/lib/api";

export async function createLinkIfNeeded(longUrl?: string) {
  if (!longUrl) return;

  await linkApi.longToShortUrl({ longUrl });
}
