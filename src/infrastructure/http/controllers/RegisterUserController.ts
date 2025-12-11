import UserRepository from "../../database/implementations/UserRepository.js";
import prisma from "../../database/client.js";
import JwtService from "../../security/TokenService.js";
import RegisterUserUseCase from "../../../application/useCases/registerUser/UseCase.js";
import HashPasswordService from "../../security/HashPasswordService.js";
import type { Request, Response, NextFunction } from "express";
import RequestDTO from "../../../application/useCases/registerUser/RequestDTO.js";
import UserAlreadyExistsError from "../../../domain/entities/user/errors/UserAlreadyExistsError.js";
import AppError from "../../../shared/errors/AppError.js";
import InvalidPasswordError from "../../../domain/entities/user/errors/InvalidPasswordError.js";
import InvalidEmailError from "../../../domain/entities/user/errors/InvalidEmailError.js";

export default function makeRegisterUserController() {
  const userRepository: UserRepository = new UserRepository(prisma);
  const tokenService: JwtService = new JwtService();
  const hashPasswordService: HashPasswordService = new HashPasswordService();
  const registerUseCase = new RegisterUserUseCase({ userRepository, tokenService, hashPasswordService });

  async function registerUser(req: Request<{}, {}, RequestDTO>, res: Response, next: NextFunction) {
    try {
      const dto = new RequestDTO(req.body);
      const result = await registerUseCase.execute(dto);
      res.status(201).json(result);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return next(new AppError({ message: err.message, statusCode: 409}));
      } else if (err instanceof InvalidPasswordError || err instanceof InvalidEmailError) {
        return next(new AppError({ message: err.message, statusCode: 422}));
      }

      return next(err);
    }
  }

  return { registerUser };
}
