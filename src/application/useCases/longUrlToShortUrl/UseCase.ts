import Link from "../../../domain/entities/link/Link.js";
import type { ILinkRepository } from "../../../domain/entities/link/repositories/ILinkRepository.js";
import type { ILinkSequenceRepository } from "../../../domain/entities/link/repositories/ILinkSequenceRepository.js";
import LongUrl from "../../../domain/entities/link/valueObjects/LongUrl.js";
import ShortCode from "../../../domain/entities/link/valueObjects/ShortCode.js";
import type RequestDTO from "./RequestDTO.js";
import ResponesDTO from "./ResponseDTO.js";


class UseCase {
  private readonly linkRepository: ILinkRepository;
  private readonly linkSequenceRepository: ILinkSequenceRepository;
  private readonly baseUrl: string;

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

    const shortCode = ShortCode.fromSequence(seq);

    const linkData = await this.linkRepository.save(new Link({
      shortCode: shortCode.value,
      longUrl: longUrl.value,
      userId: dto.userId,
    }));

    return new ResponesDTO({ 
      shortUrl: `${this.baseUrl}/${linkData.shortCode}` 
    });
  }
}

export default UseCase;
