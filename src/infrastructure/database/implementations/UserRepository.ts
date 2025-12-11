import type { IUserRepository } from "../../../domain/entities/user/repositories/IUserRepository.js";
import User from "../../../domain/entities/user/User.js";
import type { PrismaClient } from "../../../prisma/generated/client.js";

class UserRepository implements IUserRepository {
  dbClient: PrismaClient;
  constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.dbClient.user.findUnique({ where: { email } });
    if (!user) return null;

    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name ?? '',
      createdAt: user.createdAt
    });
  }

  async save(user: User): Promise<User> {
    const userData = await this.dbClient.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name
      }
    });
    
    return new User({
      id: userData.id,
      email: userData.email,
      password: userData.password,
      name: userData.name ?? '',
      createdAt: userData.createdAt
    });
  }
}

export default UserRepository;