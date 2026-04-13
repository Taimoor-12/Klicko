import type Link from "../Link.js";

export interface ILinkRepository {
  findByShortCode(shortCode: string): Promise<Link | null>;
  incrementCount(shortCode: string): Promise<void>;
  save(link: Link): Promise<Link>;
}
