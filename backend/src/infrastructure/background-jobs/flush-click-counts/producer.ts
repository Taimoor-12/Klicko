import { Queue } from "bullmq";
import bullRedis from "../bullmq-connection.js";
import { config } from "../../../config/index.js";

const FLUSH_INTERVAL_MS = 60_000; // 60 seconds

const flushQueue = new Queue("flush-click-counts", {
  connection: bullRedis
});

await flushQueue.add("flush", {}, {
  jobId: config.queue.jobId,
  repeat: { every: FLUSH_INTERVAL_MS },
  removeOnComplete: true,
  attempts: 5,
  backoff: {
    type: "exponential",
    delay: 5000,
  }
});
