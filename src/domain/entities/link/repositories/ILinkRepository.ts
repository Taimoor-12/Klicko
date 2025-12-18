import type Link from "../Link.js";

export interface ILinkRepository {
  save(link: Link): Promise<Link>;
}
