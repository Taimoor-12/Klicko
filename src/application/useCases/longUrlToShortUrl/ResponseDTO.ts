class ResponesDTO {
  shortUrl: string;

  constructor({ shortUrl } : { shortUrl: string }) {
    this.shortUrl = shortUrl;
  }
}

export default ResponesDTO;
