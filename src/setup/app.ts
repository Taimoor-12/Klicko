import express from 'express';
import type { Request, Response, NextFunction, Express } from 'express';
import AppError from '../shared/errors/AppError.js';

export default function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.use('/', (req, res) => {
    res.send('Hello World');
  });

  // centralized error handler
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const status = err.statusCode || 500;
    const body: { message: string, stack?: string} = {
      message: err.message || 'Internal Server Error'
    };
    if (process.env.NODE_ENV !== 'prod' && err.stack ) body.stack = err.stack;
    res.status(status).json(body);
  });

  return app;
}