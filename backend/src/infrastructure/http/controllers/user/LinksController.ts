import type { NextFunction, Response } from "express";
import prisma from "../../../database/client.js";
import UserRepository from "../../../database/implementations/UserRepository.js";
import AllLinksUseCase from "../../../../application/useCases/user/userLinks/UseCase.js";
import RequestDTO from "../../../../application/useCases/user/userLinks/RequestDTO.js";
import type { AuthenticatedRequest } from "../../AuthenticatedRequest.js";
import { config } from "../../../../config/index.js";

export default function makeLinksController() {
  const userRepository: UserRepository = new UserRepository(prisma);
  const baseUrl = config.app.baseUrl;
  const allLinksUseCase = new AllLinksUseCase(userRepository, baseUrl);

  async function linksController(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId } = req.user;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const dto = new RequestDTO({ userId, page, limit });

      const result = await allLinksUseCase.execute(dto);
      res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }

  return { linksController };
}
