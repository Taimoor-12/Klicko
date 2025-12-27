class RequestDTO {
  shortCode: string;

  constructor({ shortCode } : { shortCode: string }) {
    this.shortCode = shortCode;
  }
}

export default RequestDTO;
