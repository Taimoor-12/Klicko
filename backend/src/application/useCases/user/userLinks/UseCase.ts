import type { IUserRepository } from "../../../../domain/entities/user/repositories/IUserRepository.js";
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
    const linksAndCount = await this.userRepository.getLinks(
      dto.userId,
      dto.page,
      dto.limit
    );

    const { links, total } = linksAndCount;

    const totalPages = Math.ceil(total / dto.limit);

    const responseLinks = links.map(
      (link) =>
        new ResponseDTO({
          id: String(link.id),
          createdAt: this.formatDate(link.createdAt!),
          shortUrl: `${this.baseUrl}/${link.shortCode}`,
          longUrl: link.longUrl,
          clicks: link.usedCount,
        }),
    );

    return {
      links: responseLinks,
      totalPages
    };
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }
}

export default UseCase;
