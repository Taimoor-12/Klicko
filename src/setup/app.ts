import express from 'express';
import PinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import logger from '../shared/logger.js';
import type { Request, Response, NextFunction, Express } from 'express';
import AppError from '../shared/errors/AppError.js';
import authRoutes from '../infrastructure/http/routes/authRoutes.js';
import linkRoutes from '../infrastructure/http/routes/linkRoutes.js';

export default function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(cookieParser());

  // Incoming request logging
  app.use(PinoHttp({
    logger,
    customLogLevel: (req, res, next) => {
      if (res.statusCode >= 500) return "error";  // Server errors
      if (res.statusCode >= 400) return "warn";   // Client errors
      return "info";                              // Everything else (2xx, 3xx)
    }
  }));

  app.use('/api/auth', authRoutes);
  app.use('/api/urls', linkRoutes);

  // centralized error handler
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    const safeBody = { ...req.body };
    if (safeBody.password) safeBody.password = '*****';

    logger.error(
      {
        err,
        method: req.method,
        url: req.url,
        body: safeBody,
        query: req.query
      },
      'Unhandled error occurred'
    );

    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : 'Internal Server Error';
    const details = err instanceof AppError ? err.details : undefined;
    const body: { message: string, stack?: string, details?: any} = { message, details };

    if (process.env.NODE_ENV !== 'prod' && err.stack) body.stack = err.stack;
    
    res.status(status).json(body);
  });

  return app;
}
