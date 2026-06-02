import type User from "../User.js";
import UserStats from "../../../../application/useCases/user/userStats/ResponseDTO.js";
import type Link from "../../link/Link.js";

export type LinksAndCount = {
  links: Link[];
  total: number;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  getStats(userId: string): Promise<UserStats>;
  getLinks(userId: string, page: number, limit: number): Promise<LinksAndCount>;
}
