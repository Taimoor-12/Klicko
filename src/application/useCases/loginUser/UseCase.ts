import IncorrectPasswordError from "../../../domain/entities/user/errors/IncorrectPasswordError.js";
import UserDoesNotExistError from "../../../domain/entities/user/errors/UserDoesNotExistError.js";
import type { IUserRepository } from "../../../domain/entities/user/repositories/IUserRepository.js";
import type { IHashPasswordService } from "../../interfaces/IHashPasswordService.js";
import type { ITokenService } from "../../interfaces/ITokenService.js";
import ResponseDTO from "../shared/ResponseDTO.js";
import type RequestDTO from "./RequestDTO.js";

class UseCase {
  userRepository: IUserRepository;
  tokenService: ITokenService;
  hashPasswordService: IHashPasswordService;

  constructor({ 
    userRepository, 
    tokenService, 
    hashPasswordService
  } : 
  {
    userRepository: IUserRepository,
    tokenService: ITokenService,
    hashPasswordService: IHashPasswordService
  }) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.hashPasswordService = hashPasswordService;
  }
  
  async execute(dto: RequestDTO) {
    const existing = await this.userRepository.findByEmail(dto.email.toLowerCase());
    if (!existing) throw new UserDoesNotExistError();

    const hashedPassword = existing.password;
    const isPasswordValid = await this.hashPasswordService.comparePassword(dto.password, hashedPassword);
    if (!isPasswordValid) throw new IncorrectPasswordError();

    const token = await this.tokenService.sign({ userId: existing.id, email: existing.email });

    return {
      user: new ResponseDTO({
        id: existing.id,
        email: existing.email,
        name: existing.name
      }),
      token
    };
  }
}

export default UseCase;