import type { Request, Response, NextFunction } from "express";
import AppError from "../../../shared/errors/AppError.js";
import TokenService from "../../security/TokenService.js";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.authToken;
  const tokenService: TokenService = new TokenService();

  if (!token) {
    return next(new AppError({ message: 'No token provided', statusCode: 401 }));
  }

  try {
    const payload = await tokenService.verify(token);
    req.user = payload;
    next();
  } catch (err) {
    next(new AppError({ message: 'Invalid token', statusCode: 401 }));
  }
}
