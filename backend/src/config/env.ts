import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  TEST_DATABASE_URL: z.string().min(1).optional(),
  APP_BASE_URL: z.url(),
  FRONTEND_URL: z.url(),

  PORT: z.string().default("4000"),
  NODE_ENV: z.enum(["dev", "prod", "test"]),

  COOKIE_SECURE: z.string().default("false"),

  JWT_SECRET: z.string().max(50),
  BCRYPT_SALT: z.string().transform(Number),

  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),

  BULLMQ_JOB_ID: z.string().default(""),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
