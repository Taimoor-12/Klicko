import type { NextFunction, RequestHandler, Response } from "express";
import type { AuthenticatedRequest } from "./AuthenticatedRequest.js";
import AppError from "../../shared/errors/AppError.js";

function requireAuth(handler: (req: AuthenticatedRequest, res: Response, next: NextFunction) => any): RequestHandler {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError({ message: 'Unauthenticated', statusCode: 401}))
    }

    return handler(req as AuthenticatedRequest, res, next);
  }
}

export default requireAuth;
