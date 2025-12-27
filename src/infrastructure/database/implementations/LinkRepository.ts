import Link from "../../../domain/entities/link/Link.js";
import type { ILinkRepository } from "../../../domain/entities/link/repositories/ILinkRepository.js";
import type { PrismaClient } from "../../../prisma/generated/client.js";

class LinkRepository implements ILinkRepository {
  dbClient: PrismaClient;
  constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  async findByShortCode(shortCode: string): Promise<Link | null> {
    const linkData = await this.dbClient.link.findUnique({ where: { shortCode } });
    if (!linkData) return null;

    return new Link({
      id: linkData.id,
      shortCode: linkData.shortCode,
      longUrl: linkData.longUrl,
      userId: linkData.userId,
      usedCount: linkData.usedCount,
      createdAt: linkData.createdAt,
      updatedAt: linkData.updatedAt
    })
  }

  async incrementCount(shortCode: string): Promise<void> {
    await this.dbClient.link.update({
      where: { shortCode },
      data: { usedCount : { increment: 1 } }
    });
  }

  async save(link: Link): Promise<Link> {
    const linkData = await this.dbClient.link.create({
      data: {
        shortCode: link.shortCode,
        longUrl: link.longUrl,
        userId: link.userId
      }
    });

    return new Link({
      id: linkData.id,
      shortCode: linkData.shortCode,
      longUrl: linkData.longUrl,
      userId: linkData.userId,
      usedCount: linkData.usedCount
    });
  }
}

export default LinkRepository;