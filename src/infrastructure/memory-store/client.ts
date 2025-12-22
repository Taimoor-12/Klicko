import { createClient } from "redis";
import logger from "../../shared/logger.js";

const redisUsername = getEnv("REDIS_USERNAME");
const redisPassword = getEnv("REDIS_PASSWORD");
const redisHost = getEnv("REDIS_HOST");
const redisPort = Number(getEnv("REDIS_PORT"));

const redisClient = createClient({
  username: redisUsername,
  password: redisPassword,
  socket: {
    host: redisHost,
    port: redisPort,
    reconnectStrategy: (retries) => {
      const baseDelay = Math.min(2 ** retries * 50, 2000);
      const jitter = Math.random() * 200;
      return baseDelay + jitter;
    }
  }
});

let logged = false;

/* ---------- Redis lifecycle events ---------- */

redisClient.on("connect", () => {
  logger.info("Redis socket connected");
});

redisClient.on("ready", () => {
  logged = false; // allow future error logs
  logger.info("Redis ready");
});

redisClient.on("reconnecting", () => {
  logger.warn("Redis reconnecting");
});

redisClient.on("end", () => {
  logger.error("Redis connection closed");
});

redisClient.on("error", (err) => {
  if (!logged) {
    logger.error({ err }, "Redis Client Error");
    logged = true;
  }
});

/* ---------- Initial connection ---------- */

try {
  await redisClient.connect();
} catch (err) {
  logger.fatal({ err }, "Failed to connect to Redis. Shutting down.");
  process.exit(1); // fail fast — Redis is required
}

/* ---------- Utils ---------- */

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export default redisClient;
export type RedisClient = typeof redisClient;
