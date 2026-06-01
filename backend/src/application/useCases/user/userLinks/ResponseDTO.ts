class ResponseDTO {
  id: string;
  shortUrl: string;
  longUrl: string;
  clicks: number;
  createdAt: string;

  constructor({
    id,
    shortUrl,
    longUrl,
    clicks,
    createdAt
  } : {
    id: string;
    shortUrl: string;
    longUrl: string;
    clicks: number;
    createdAt: string;
  }) {
    this.id = id;
    this.shortUrl = shortUrl;
    this.longUrl = longUrl;
    this.clicks = clicks;
    this.createdAt = createdAt;
  }
}

export default ResponseDTO;
