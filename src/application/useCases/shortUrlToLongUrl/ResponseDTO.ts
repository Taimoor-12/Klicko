class ResponesDTO {
  longUrl: string;

  constructor({ longUrl } : { longUrl: string }) {
    this.longUrl = longUrl;
  }
}

export default ResponesDTO;
