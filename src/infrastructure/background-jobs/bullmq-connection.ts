import IORedis from "ioredis";
import getEnv from "../../shared/utils/getEnv.js";

const redisUsername = getEnv("REDIS_USERNAME");
const redisPassword = getEnv("REDIS_PASSWORD");
const redisHost = getEnv("REDIS_HOST");
const redisPort = Number(getEnv("REDIS_PORT"));

const bullRedis = new IORedis({
  host: redisHost,
  port: redisPort,
  username: redisUsername,
  password: redisPassword,
  maxRetriesPerRequest: null,
});

export default bullRedis;
