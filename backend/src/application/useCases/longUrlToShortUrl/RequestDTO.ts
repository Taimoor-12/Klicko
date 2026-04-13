class RequestDTO {
  userId: string;
  longUrl: string;

  constructor({ userId, longUrl } : { userId: string, longUrl: string }) {
    this.userId = userId;
    this.longUrl = longUrl;
  }
}

export default RequestDTO;
