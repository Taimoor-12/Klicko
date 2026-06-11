import { z } from "zod";

const isTest = process.env.NODE_ENV === "test";

const envSchema = z.object({
  DATABASE_URL: isTest ? z.string().min(1).optional() : z.string().min(1),
  TEST_DATABASE_URL: !isTest ? z.string().min(1).optional() : z.string().min(1),

  APP_BASE_URL: z.url(),
  FRONTEND_URL: z.url(),

  PORT: z.string().default("4000"),
  NODE_ENV: z.enum(["dev", "prod", "test"]),

  COOKIE_SECURE: z.string().default("false"),

  JWT_SECRET: z.string().max(50),
  BCRYPT_SALT: z.string().transform(Number).optional(),

  REDIS_USERNAME: isTest ? z.string().optional().default("") : z.string(),
  REDIS_PASSWORD: isTest ? z.string().optional().default("") : z.string(),
  REDIS_HOST: isTest ? z.string().optional() : z.string(),
  REDIS_PORT: isTest ? z.string().optional().transform(Number) : z.string().transform(Number),

  BULLMQ_JOB_ID: z.string().default(""),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
