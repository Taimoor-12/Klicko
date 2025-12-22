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
    port: redisPort
  }
});

let logged = false;
redisClient.on("error", (err) => {
  if (!logged) {
    logger.error({ err }, "Redis Client Error");
    logged = true;
  }
});

try {
  await redisClient.connect();
} catch (err) {
  logger.error({ err }, "Failed to connect to Redis");
}

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);

  return value;
}

export default redisClient;
export type RedisClient = typeof redisClient;
