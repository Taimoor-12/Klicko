import UserStats from "../../../application/useCases/user/userStats/ResponseDTO.js";
import type { LinksAndCount } from "../../../domain/entities/user/repositories/IUserRepository.js";
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
      name: user.name ?? "",
      createdAt: user.createdAt,
    });
  }

  async save(user: User): Promise<User> {
    const userData = await this.dbClient.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });

    return new User({
      id: userData.id,
      email: userData.email,
      password: userData.password,
      name: userData.name ?? "",
      createdAt: userData.createdAt,
    });
  }

  async getStats(userId: string): Promise<UserStats> {
    const stats = await this.dbClient.$queryRaw<UserStats[]>`
      SELECT
        COALESCE(SUM("usedCount"), 0)::int AS "totalClicks",
        COUNT(*)::int AS "totalLinks",
        (
          SELECT "shortCode"
          FROM "Link" l1
          WHERE l1."userId" = ${userId}
          ORDER BY l1."usedCount" DESC
          LIMIT 1
        ) AS "topLink"
      FROM "Link"
      WHERE "userId" = ${userId};
    `;

    if (!stats[0]) {
      throw new Error("Failed to fetch user stats");
    }

    const result = stats[0];

    return new UserStats({
      totalClicks: Number(result.totalClicks ?? 0),
      totalLinks: Number(result.totalLinks ?? 0),
      topLink: result.topLink,
    });
  }
  
  async getLinks(userId: string, page: number, limit: number): Promise<LinksAndCount> {
    const offset = (page - 1) * limit;

    const [links, total] = await this.dbClient.$transaction([
      this.dbClient.link.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),

      this.dbClient.link.count({
        where: { userId },
      }),
    ]);

    return {
      links,
      total
    };
  }
}

export default UserRepository;
