import type { NextFunction, Request, Response } from "express";
import prisma from "../../../database/client.js";
import UserRepository from "../../../database/implementations/UserRepository.js";
import AllLinksUseCase from "../../../../application/useCases/user/userLinks/UseCase.js";
import RequestDTO from "../../../../application/useCases/user/RequestDTO.js";
import type { AuthenticatedRequest } from "../../AuthenticatedRequest.js";

export default function makeLinksController() {
  const userRepository: UserRepository = new UserRepository(prisma);
  const baseUrl = `${process.env.APP_BASE_URL}`;
  const allLinksUseCase = new AllLinksUseCase(userRepository, baseUrl);

  async function linksController(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.user;

      const dto = new RequestDTO(userId);

      const result = await allLinksUseCase.execute(dto);
      res.status(201).json(result);
    } catch (err) {
      return next(err);
    }
  }

  return { linksController }
}
