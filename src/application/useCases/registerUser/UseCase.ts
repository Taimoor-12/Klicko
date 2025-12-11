import UserAlreadyExistsError from "../../../domain/entities/user/errors/UserAlreadyExistsError.js";
import type { IUserRepository } from "../../../domain/entities/user/repositories/IUserRepository.js";
import User from "../../../domain/entities/user/User.js";
import Email from "../../../domain/entities/user/valueObjects/Email.js";
import Password from "../../../domain/entities/user/valueObjects/Password.js";
import type { IHashPasswordService } from "../../interfaces/IHashPasswordService.js";
import type { ITokenService } from "../../interfaces/ITokenService.js";
import RequestDTO from "./RequestDTO.js";
import ResponseDTO from "./ResponseDTO.js";

class UseCase {
  userRepository: IUserRepository;
  tokenService: ITokenService;
  hashPasswordService: IHashPasswordService;

  constructor({ 
    userRepository, 
    tokenService, 
    hashPasswordService 
  } : 
  { userRepository: IUserRepository, 
    tokenService: ITokenService,
    hashPasswordService: IHashPasswordService,
  }) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.hashPasswordService = hashPasswordService;
  }

  async execute(dto: RequestDTO) {
    const emailVO = new Email(dto.email);
    const passwordVO = new Password(dto.password);

    const email = emailVO.getValue();
    const password = passwordVO.getValue();

    const existing = await this.userRepository.findByEmail(email);
    if (existing) throw new UserAlreadyExistsError();

    const hashPassword = await this.hashPasswordService.hashPassword(password);

    const savedUser = await this.userRepository.save(new User({
      email: email,
      password: hashPassword,
      name: dto.name ?? '',
    }));

    const token = await this.tokenService.sign({ userId: savedUser.id as string, email: savedUser.email });

    return new ResponseDTO({
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      token
    });
  }
}

export default UseCase;