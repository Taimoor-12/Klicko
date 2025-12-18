import Link from "../../../domain/entities/link/Link.js";
import type { ILinkRepository } from "../../../domain/entities/link/repositories/ILinkRepository.js";
import type { ILinkSequenceRepository } from "../../../domain/entities/link/repositories/ILinkSequenceRepository.js";
import LongUrl from "../../../domain/entities/link/valueObjects/LongUrl.js";
import type RequestDTO from "./RequestDTO.js";
import ResponesDTO from "./ResponseDTO.js";


class UseCase {
  linkRepository: ILinkRepository;
  linkSequenceRepository: ILinkSequenceRepository;
  baseUrl: string;

  constructor({ 
    linkRepository, 
    linkSequenceRepository,
    baseUrl
  } : { 
    linkRepository: ILinkRepository,
    linkSequenceRepository: ILinkSequenceRepository,
    baseUrl: string,
  }) {
    this.linkRepository = linkRepository;
    this.linkSequenceRepository = linkSequenceRepository;
    this.baseUrl = baseUrl;
  }
  
  async execute(dto: RequestDTO) {
    const longUrl = new LongUrl({ value: dto.longUrl });

    const seqBigInt = await this.linkSequenceRepository.getNextSequenceNumber();
    const seq = Number(seqBigInt);
    
    const longToShort = this.toBase62(seq);

    const linkData = await this.linkRepository.save(new Link({
      shortCode: longToShort,
      longUrl: longUrl.value,
      userId: dto.userId,
    }));

    return new ResponesDTO({ 
      shortUrl: `${this.baseUrl}/${linkData.shortCode}` 
    });
  }

  private toBase62(num: number): string {
    const base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    if (num === 0) return base62[0]!;

    let result = '';

    while (num > 0) {
      const remainder = num % 62;
      result = base62[remainder] + result;
      num = Math.floor(num / 62);
    }

    return result;
  }
}

export default UseCase;