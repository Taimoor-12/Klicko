class ResponseDTO {
  longUrl: string;

  constructor({ longUrl } : { longUrl: string }) {
    this.longUrl = longUrl;
  }
}

export default ResponseDTO;
