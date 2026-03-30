import type { Request, Response, NextFunction } from "express";
import { ipKeyGenerator, rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import RedisClient from "../../memory-store/client.js";
import type { AuthenticatedRequest } from "../../http/AuthenticatedRequest";

type KeyType = 'ip' | 'userId' | 'email';

function makeRateLimiter({ 
  windowMs, 
  limit, 
  keyType = 'ip',
  prefix
} : {
  windowMs: number,
  limit: number,
  keyType?: KeyType,
  prefix: string
}) {
  if (process.env.NODE_ENV === 'test') {
    return (_req: Request, _res: Response, next: NextFunction) => next(); // passthrough
  }
  
  return rateLimit({
    windowMs: windowMs,
    limit: limit,
    standardHeaders: true,  
    legacyHeaders: false,
    keyGenerator: (req) => {
      switch (keyType) {
        case 'userId':
          const authenticatedReq = req as AuthenticatedRequest;
          return authenticatedReq.user.userId;
        case 'email':
          return req.body.email.toLowerCase();
        case 'ip':
        default:
          return ipKeyGenerator(req.ip ?? '');
      }
    },

    store: new RedisStore({
      prefix,
      sendCommand: (...args: string[]) => RedisClient.sendCommand(args),
    }),
  });
}

export default makeRateLimiter;
