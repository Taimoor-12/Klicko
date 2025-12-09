import express from 'express';
import type { Request, Response, NextFunction, Express } from 'express';

export default function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.use('/', (req, res) => {
    res.send('Hello World');
  });

  // centralized error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    const status = err.statusCode || 500;
    const body: { message: string, stack?: string} = {
      message: err.message || 'Internal Server Error'
    };
    if (process.env.NODE_ENV !== 'prod') body.stack = err.stack;
    res.status(status).json(body);
  });

  return app;
}