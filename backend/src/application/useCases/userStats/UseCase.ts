import type { IUserRepository } from "../../../domain/entities/user/repositories/IUserRepository.js";
import type RequestDTO from "./RequestDTO.js";
import ResponseDTO from "./ResponseDTO.js";

class UseCase {
  private readonly userRepository: IUserRepository;
  private readonly baseUrl: string;

  constructor(userRepository: IUserRepository, baseUrl: string) {
    this.userRepository = userRepository;
    this.baseUrl = baseUrl;
  }
  
  async execute(dto: RequestDTO) {
    const stats = await this.userRepository.getStats(dto.userId);

    return new ResponseDTO({ 
      totalClicks: stats.totalClicks,
      totalLinks: stats.totalLinks,
      topLink: `${this.baseUrl}/${stats.topLink}` 
    });
  }
}

export default UseCase;
