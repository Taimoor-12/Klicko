import ShortCodeDoesNotExistError from "../../../domain/entities/link/errors/ShortCodeDoesNotExistError.js";
import type { ILinkRepository } from "../../../domain/entities/link/repositories/ILinkRepository.js";
import ShortCode from "../../../domain/entities/link/valueObjects/ShortCode.js";
import type { ICacheStore } from "../../interfaces/ICacheStore.js";
import type RequestDTO from "./RequestDTO.js";
import ResponseDTO from "./ResponseDTO.js";

class UseCase {
  private linkRepository: ILinkRepository;
  private cacheStore: ICacheStore;

  constructor({
    linkRepository,
    cacheStore
  } : 
  { 
    linkRepository: ILinkRepository,
    cacheStore: ICacheStore
  }) {
    this.linkRepository = linkRepository;
    this.cacheStore = cacheStore;
  }

  async execute(dto: RequestDTO) {
    const shortCodeVO = new ShortCode({ value: dto.shortCode });
    const shortCode = shortCodeVO.value;

    let longUrl = await this.cacheStore.get(shortCode);
    if (!longUrl) {
      let linkData = await this.linkRepository.findByShortCode(shortCode);
      if (!linkData) throw new ShortCodeDoesNotExistError();

      await this.cacheStore.set(shortCode, linkData.longUrl);

      await this.cacheStore.incrementCount(shortCode);
      
      longUrl = linkData.longUrl;
    }

    return new ResponseDTO({ longUrl });
  }
}

export default UseCase;
