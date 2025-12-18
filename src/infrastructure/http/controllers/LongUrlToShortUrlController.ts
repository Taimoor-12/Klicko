import type { NextFunction, Request, Response } from "express";
import prisma from "../../database/client.js";
import LinkRepository from "../../database/implementations/LinkRepository.js";
import LinkSequenceRepository from "../../database/implementations/LinkSequenceRepository.js";
import RequestDTO from "../../../application/useCases/longUrlToShortUrl/RequestDTO.js";
import LongUrlToShortUseCase from "../../../application/useCases/longUrlToShortUrl/UseCase.js";
import InvalidLongUrlError from "../../../domain/entities/link/errors/InvalidLongUrlError.js";
import AppError from "../../../shared/errors/AppError.js";
import InvalidProtocolError from "../../../domain/entities/link/errors/InvalidProtocolError.js";
import type { AuthenticatedRequest } from "../AuthenticatedRequest.js";

export default function makeLongUrlToShortUrlController() {
  const linkRepository: LinkRepository = new LinkRepository(prisma);
  const linkSequenceRepository: LinkSequenceRepository = new LinkSequenceRepository(prisma);
  const baseUrl = `${process.env.APP_BASE_URL}/${process.env.PORT}`;
  const longUrltoShortUrlUseCase = new LongUrlToShortUseCase({ linkRepository, linkSequenceRepository, baseUrl });

  async function convertLongUrlToShort(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { longUrl } = req.body;
      if (!longUrl) throw new AppError({ message: 'Long URL cannot be empty', statusCode: 400 });

      const dto = new RequestDTO({
        userId: req.user.userId,
        longUrl: longUrl
      });

      const result = await longUrltoShortUrlUseCase.execute(dto);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof InvalidLongUrlError || err instanceof InvalidProtocolError) {
        return next(new AppError({ message: err.message, statusCode: 400 }))
      }

      return next(err);
    }
  }

  return { convertLongUrlToShort }
}
