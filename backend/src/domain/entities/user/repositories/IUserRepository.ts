import type User from "../User.js";
import UserStats from "../../../../application/useCases/userStats/ResponseDTO.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  getStats(userId: string): Promise<UserStats>;
}
