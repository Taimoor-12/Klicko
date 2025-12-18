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
    usedCount
  } : {
    id?: number,
    shortCode: string,
    longUrl: string,
    userId: string,
    usedCount?: number;
  }) {
    this.id = id ?? 0;
    this.shortCode = shortCode;
    this.longUrl = longUrl;
    this.userId = userId;
    this.usedCount = usedCount ?? 0;
  }
}

export default Link;