import type { ILinkSequenceRepository } from "../../../domain/entities/link/repositories/ILinkSequenceRepository.js";
import type { PrismaClient } from "../../../prisma/generated/client.js";

class LinkSequenceRepository implements ILinkSequenceRepository {
  dbClient: PrismaClient;
  constructor(dbClient: PrismaClient) {
    this.dbClient = dbClient;
  }

  async getNextSequenceNumber(): Promise<bigint> {
      const result = await this.dbClient.$queryRaw<
        { lastId: bigint }[]
      >`
      SELECT nextval('link_sequence') AS "lastId"`;

      if (!result[0]) {
        throw new Error("Failed to get next sequence number");
      }

      return result[0].lastId;
  }
}

export default LinkSequenceRepository;
