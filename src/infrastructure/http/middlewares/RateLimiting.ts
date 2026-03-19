import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import RedisClient from "../../memory-store/client.js";
import type { AuthenticatedRequest } from "../../http/AuthenticatedRequest";

function makeRateLimiter(windowMs: number, limit: number) {
  return rateLimit({
    windowMs: windowMs,
    limit: limit,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      const authenticatedReq = req as AuthenticatedRequest;
      return authenticatedReq.user ? authenticatedReq.user.userId : ipKeyGenerator(req.ip ?? '')
    },

    store: new RedisStore({
      sendCommand: (...args: string[]) => RedisClient.sendCommand(args),
    }),
  });
}

export default makeRateLimiter;
