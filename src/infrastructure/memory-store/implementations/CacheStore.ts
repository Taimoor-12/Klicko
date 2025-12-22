import type { ICacheStore } from "../../../application/interfaces/ICacheStore.js";
import type { RedisClient } from "../client.js";

class CacheStore implements ICacheStore {
  private readonly cacheClient: RedisClient;
  private readonly CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

  constructor(cacheClient: RedisClient) {
    this.cacheClient = cacheClient;
  }

  async get(key: string): Promise<string | null> {
    return await this.cacheClient.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.cacheClient.set(key, value, { EX: this.CACHE_TTL_SECONDS });
  }

  async incrementCount(shortCode: string): Promise<void> {
    await this.cacheClient.hIncrBy("click_counts", shortCode, 1);
  }
}

export default CacheStore;
