import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  TEST_DATABASE_URL: z.string().optional(),

  APP_BASE_URL: z.url(),
  FRONTEND_URL: z.url().optional(),

  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["dev", "prod", "test"]),

  COOKIE_SECURE: z.string().default("false"),

  JWT_SECRET: z.string().max(50),
  BCRYPT_SALT: z.string().transform(Number).default(10),

  REDIS_USERNAME: z.string().optional().default(""),
  REDIS_PASSWORD: z.string().optional().default(""),
  REDIS_HOST: z.string().optional(),
  REDIS_PORT: z.string().optional().transform(Number),

  BULLMQ_JOB_ID: z.string().default(""),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:");
  console.error(z.treeifyError(parsed.error));
  process.exit(1);
}

const env = parsed.data;

if (env.NODE_ENV !== "test" && !env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required in non-test environments");
}

if (env.NODE_ENV === "test" && !env.TEST_DATABASE_URL) {
  throw new Error("TEST_DATABASE_URL is required in test environment");
}

if (env.NODE_ENV !== "test" && !env.FRONTEND_URL) {
  throw new Error("FRONTEND_URL is required in non-test environments");
}

export { env };
