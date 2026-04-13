import type User from "../User.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
