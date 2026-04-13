export interface ICacheStore {
  get(key: string): Promise<string | null>
  set(key: string, value: string): Promise<void>;
  incrementCount(shortCode: string): Promise<void>;
}
