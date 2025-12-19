import ShortCodeDoesNotExistError from "../../../domain/entities/link/errors/ShortCodeDoesNotExistError.js";
import type { ILinkRepository } from "../../../domain/entities/link/repositories/ILinkRepository.js";
import ShortCode from "../../../domain/entities/link/valueObjects/ShortCode.js";
import type RequestDTO from "./RequestDTO.js";
import ResponesDTO from "./ResponseDTO.js";

class UseCase {
  private linkRepository: ILinkRepository;
  constructor({
    linkRepository
  } : 
  { 
    linkRepository: ILinkRepository 
  }) {
    this.linkRepository = linkRepository;
  }

  async execute(dto: RequestDTO) {
    const shortCodeVO = new ShortCode({ value: dto.shortCode });
    const shortCode = shortCodeVO.value;

    let linkData = await this.linkRepository.findByShortCode(shortCode);
    if (!linkData) throw new ShortCodeDoesNotExistError();

    await this.linkRepository.incrementCount(shortCode);

    return new ResponesDTO({
      longUrl: linkData.longUrl
    });
  }
}

export default UseCase;
