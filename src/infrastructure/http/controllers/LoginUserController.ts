import type { Request, Response, NextFunction } from "express";
import RequestDTO from "../../../application/useCases/loginUser/RequestDTO.js";
import UserRepository from "../../database/implementations/UserRepository.js";
import prisma from "../../database/client.js";
import TokenService from "../../security/TokenService.js";
import HashPasswordService from "../../security/HashPasswordService.js";
import LoginUseCase from "../../../application/useCases/loginUser/UseCase.js";
import UserDoesNotExistError from "../../../domain/entities/user/errors/UserDoesNotExistError.js";
import AppError from "../../../shared/errors/AppError.js";
import IncorrectPasswordError from "../../../domain/entities/user/errors/IncorrectPasswordError.js";

export default function makeLoginUserController() {
  const userRepository: UserRepository = new UserRepository(prisma);
  const tokenService: TokenService = new TokenService();
  const hashPasswordService: HashPasswordService = new HashPasswordService();
  const loginUseCase = new LoginUseCase({ userRepository, tokenService, hashPasswordService });

  async function loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = new RequestDTO(req.body);
      const { user, token } = await loginUseCase.execute(dto);
    
      res.cookie('authToken', token, 
        { 
          httpOnly: true, 
          secure: process.env.NODE_ENV === 'prod',
          maxAge: 60 * 60 * 1000 // '1hr'
        }
      );

      res.status(201).json(user);
    } catch (err) {
      if (err instanceof UserDoesNotExistError) {
        return next(new AppError({ message: err.message, statusCode: 404 }));
      } else if (err instanceof IncorrectPasswordError) {
        return next(new AppError({ message: err.message, statusCode: 401 }));
      }

      return next(err);
    }
  }

  return { loginUser };
}