import express from "express";
import makeLongUrlToShortUrlController from "../controllers/LongUrlToShortUrlController.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import requireAuth from "../requireAuth.js";
import validateBody from "../middlewares/ValidateBody.js";
import makeRateLimiter from "../middlewares/RateLimiting.js";

const router = express.Router();

const ONE_HOUR_MS = 60 * 60 * 1000;

const longUrlToShortUrlController = makeLongUrlToShortUrlController();

router.post(
  "/shorten",
  authMiddleware,
  validateBody(["longUrl"]),
  makeRateLimiter({ windowMs: ONE_HOUR_MS, limit: 50, keyType: 'userId', prefix: 'rl:long_url:' }),
  requireAuth(longUrlToShortUrlController.convertLongUrlToShort),
);

export default router;
