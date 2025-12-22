import type { Request, NextFunction, Response } from "express";
import ShortUrlToLongUrlUseCase from "../../../application/useCases/shortUrlToLongUrl/UseCase.js";
import prisma from "../../database/client.js";
import redis from "../../memory-store/client.js";
import LinkRepository from "../../database/implementations/LinkRepository.js";
import RequestDTO from "../../../application/useCases/shortUrlToLongUrl/RequestDTO.js";
import InvalidShortUrlError from "../../../domain/entities/link/errors/InvalidShortUrlError.js";
import ShortCodeDoesNotExistError from "../../../domain/entities/link/errors/ShortCodeDoesNotExistError.js";
import CacheStore from "../../memory-store/implementations/CacheStore.js";

function makeShortUrlToLongUrlController() {
  const linkRepository: LinkRepository = new LinkRepository(prisma);
  const cacheStore: CacheStore = new CacheStore(redis); 
  const shortUrlToLongUrlUseCase = new ShortUrlToLongUrlUseCase({ linkRepository, cacheStore });

  async function redirectToLongUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const shortCode = req.params.shortCode as string;

      const dto = new RequestDTO({ shortCode });
      const result = await shortUrlToLongUrlUseCase.execute(dto);

      res.redirect(result.longUrl);
    } catch (err) {
      if (err instanceof InvalidShortUrlError || err instanceof ShortCodeDoesNotExistError) {
        return res.status(404).send('404 Not Found');
      }

      return next(err);
    }
  }

  return { redirectToLongUrl };
}

export default makeShortUrlToLongUrlController;
