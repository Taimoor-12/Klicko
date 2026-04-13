class Link {
  id: number;
  shortCode: string;
  longUrl: string;
  userId: string;
  usedCount: number;
  createdAt: Date | undefined
  updatedAt: Date | undefined

  constructor({
    id,
    shortCode,
    longUrl,
    userId,
    usedCount,
    createdAt,
    updatedAt
  } : {
    id?: number,
    shortCode: string,
    longUrl: string,
    userId: string,
    usedCount?: number;
    createdAt?: Date | undefined,
    updatedAt?: Date | undefined,
  }) {
    this.id = id ?? 0;
    this.shortCode = shortCode;
    this.longUrl = longUrl;
    this.userId = userId;
    this.usedCount = usedCount ?? 0;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Link;
