import type { NextFunction, Request, Response } from "express";
import AppError from "../../../shared/errors/AppError.js";

function validateBody(requiredFields:  string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) return next(new AppError({ message: 'Request body cannot be empty', statusCode: 400 }));

    const errors: { field: string, message: string }[] = [];

    for (const field of requiredFields) {
      if(!req.body[field]) {
        errors.push({ field, message: `${field} is required` });
      }
    }

    if (errors.length > 0) return next(new AppError({ message: "Validation failed", statusCode: 422, details: errors }));

    next();
  }
}

export default validateBody;
