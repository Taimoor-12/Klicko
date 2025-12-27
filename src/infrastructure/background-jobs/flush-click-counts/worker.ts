import { Worker } from "bullmq";
import redisClient from "../../memory-store/client.js";
import prisma from "../../database/client.js";
import bullRedis from "../bullmq-connection.js";
import logger from "../../../shared/logger.js";

const worker = new Worker(
  "flush-click-counts",
  async () => {
    const exists = await redisClient.exists("click_counts");

    if (!exists) return;

    // 1. Atomic Swap Keys
    const processingKey = 'click_counts_processing';

    if (!await redisClient.exists(processingKey)) {
      await redisClient.rename("click_counts", processingKey);
    }

    // 2. Read all counts
    const counts = await redisClient.hGetAll(processingKey);
    if (Object.keys(counts).length === 0) {
      await redisClient.del(processingKey);
      return;
    }

    // 3. Build bulk SQL
    const values = Object.entries(counts)
          .map(([ShortCode, count]) => `('${ShortCode}', ${Number(count)})`)
          .join(",");
    
    const sql = `
      UPDATE "Link" as l
      SET "usedCount" = "usedCount" + v.count
      FROM (VALUES ${values}) AS v("shortCode", "count")
      WHERE l."shortCode" = v."shortCode";
    `;

    // 4. Transaction
    await prisma.$transaction(async (trx) => {
      await trx.$queryRawUnsafe(sql);
    });

    // 5. Cleanup
    await redisClient.del(processingKey);
  },
  {
    connection: bullRedis,
    concurrency: 1,
  }
);

worker.on("failed", (job, err) => {
  logger.error({ err }, "Flush failed");
});
