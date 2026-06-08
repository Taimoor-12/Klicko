import { env } from './env.js';

export const config = {
  app: {
    port: Number(env.PORT),
    nodeEnv: env.NODE_ENV,
    baseUrl: env.APP_BASE_URL,
    frontendUrl: env.FRONTEND_URL,
  },

  db: {
    url: env.NODE_ENV === "test"
      ? env.TEST_DATABASE_URL
      : env.DATABASE_URL,
  },

  auth: {
    jwtSecret: env.JWT_SECRET,
    bcryptSaltRounds: env.BCRYPT_SALT,
    cookieSecure: env.COOKIE_SECURE === "true",
  },

  redis: {
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
} as const;
