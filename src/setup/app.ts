import express from 'express';
import PinoHttp from 'pino-http';
import logger from '../shared/logger.js';
import type { Request, Response, NextFunction, Express } from 'express';
import AppError from '../shared/errors/AppError.js';
import authRoutes from '../infrastructure/http/routes/authRoutes.js';

export default function createApp(): Express {
  const app = express();
  app.use(express.json());

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

    const status = err.statusCode || 500;
    const body: { message: string, stack?: string} = {
      message: err.message || 'Internal Server Error'
    };
    if (process.env.NODE_ENV !== 'prod' && err.stack) body.stack = err.stack;
    res.status(status).json(body);
  });

  return app;
}