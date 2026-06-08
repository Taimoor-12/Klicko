import IORedis from "ioredis";
import { config } from "../../config/index.js";

const redisUsername = config.redis.username;
const redisPassword = config.redis.password;
const redisHost = config.redis.host;
const redisPort = config.redis.port;

const bullRedis = new IORedis({
  host: redisHost,
  port: redisPort,
  username: redisUsername,
  password: redisPassword,
  maxRetriesPerRequest: null,
});

export default bullRedis;
