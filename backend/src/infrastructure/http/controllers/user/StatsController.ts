import type { NextFunction, Request, Response } from "express";
import prisma from "../../../database/client.js";
import UserRepository from "../../../database/implementations/UserRepository.js";
import StatsUseCase from "../../../../application/useCases/user/userStats/UseCase.js";
import RequestDTO from "../../../../application/useCases/user/userStats/RequestDTO.js";
import type { AuthenticatedRequest } from "../../AuthenticatedRequest.js";
import { config } from "../../../../config/index.js";

export default function makeStatsController() {
  const userRepository: UserRepository = new UserRepository(prisma);
  const baseUrl = config.app.baseUrl;
  const statsUseCase = new StatsUseCase(userRepository, baseUrl);

  async function statsController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      const dto = new RequestDTO(userId);

      const result = await statsUseCase.execute(dto);
      res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }

  return { statsController }
}
